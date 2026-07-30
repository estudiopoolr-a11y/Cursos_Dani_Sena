const http = require('http'); //IMportamos moduos necesarios

const mysql = require('mysql12/promise'); //Importamos la version nativa de mysql para nodejs

const pool = mysql.createPool({ // creamos un pool de conexiones a la base de datos
    host: 'localhost',  // cambiar por 'db' si corre dentro de la red interna de docker
    user: 'root',
    password: 'root',
    database: 'todo_db',
    waitForConnections: true,
    connectionLimit: 10,
});

const server = http.createServer(async (req, res) => { // creamos un servidor http

    //cabeceras de CORS manuales obligatorias pra q el navegador no bloquee el live server 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { // si es una peticion OPTIONS, respondemos con 200
        res.writeHead(204);
        res.end();
        return;
    }

    // Enrutador nativo con consultas sql reales a la base de datos

    //ruta 1 obtener tareas (get/tasks )
    if (req.url === '/tasks' && req.method === 'GET') {
        try {
            const [rows] = await pool.query('SELECT * FROM tasks'); // obtenemos todas las tareas de la base de datos
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'success',
                data: rows
            }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'error',message: 'Error al obtener las tareas' + error.message }));
        }
        return;
    }

    //ruta 2 crear tarea (post/tasks)
    if (req.url === '/tasks' && req.method === 'POST') {
        let body = '';

        //Reconstruimos el flujo de datos del cuerpo  (stream data chunks)
        req.on('data', chunk => { body += chunk.toString(); });

        //Cuando termina de recibir los datos, procesamos la solicitud
        req.on('end', async () => {
            try {
                const { title, description } = JSON.parse(body); // parseamos el cuerpo de la solicitud

                if (!title || !description) { // validamos que title y description no esten vacios
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'error', message: 'Title y autor son obligatorios' }));
                    return;
                }

                //consulta sql son marcadores de posicion para pasar los datos de forma limpia 
                const sql = 'INSERT INTO tasks (title, description,author,is_completed) VALUES (?, ?, ?, 0)';
                const [result] = await pool.query(sql, [title, description || null,author]); // ejecutamos la consulta sql con los datos del cuerpo de la solicitud

                // Construimos el objeto de respuesta usando el ID auto-incremental que generó MySQL
                const newTask = {
                    id: result.insertId,
                    title,
                    description: description || null,
                    author,
                    is_completed: 0
                };

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success', data: newTask }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'error', message: 'Error al crear la tarea: ' + error.message }));
            }
        });
        return;
    }

    // RUTA 3: Actualizar tarea existente (PUT /tasks/:id)
    if (req.url.startsWith('/tasks/') && req.method === 'PUT') {
        const urlParts = req.url.split('/');
        const taskId = parseint(urlParts[2]); // obtenemos el id de la tarea a actualizar

        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const { title, description, author, is_completed } = JSON.parse(body);

                // 1. Validar si la tarea existe en la base de datos todo_db
                const [existingTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
                if (existingTask.length === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'error', message: 'Tarea no encontrada' }));
                    return;
                }
     // 2. Regra de negocio: Validar propiedad del autor
                if(rows[0].author !== author){
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'error', message: 'No autorizado.La tarea es de ${row[0].author}' }));
                    return;
                }

                // 3. Ejecutar la actualización directa en MySQL con marcadores (?)
                const sql = 'UPDATE tasks SET title = ?, description = ?, is_completed = ? WHERE id =? ';
                await pool.query(sql, [title, description || null, is_completed, taskId]);
                
                res.writeHead(200, {'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success', data: null }));
                } catch (error) {
                    res.writeHead(500, {'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'error', message: 'Error en MySQL: ' + error.message }));
                }
        });
        return;
    }

    // RUTA 4: Eliminar tarea existente (DELETE /tasks/:id)
    if (req.url.startsWith('/tasks/') && req.method === 'DELETE') {
        const urlParts = req.url.split('/');
        const taskId = parseInt(urlParts[2]); // obtenemos el id de la tarea a eliminar

        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });

        req.on('end', async () => {
            try {
                const { author } = JSON.parse(body);

                // Paso A: Consultar a MySQL si la tarea existe y quién es el dueño
                const [rows] = await pool.query('SELECT author FROM tasks WHERE id = ?', [taskId]);

                if (rows.length === 0) {
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'error', message: 'la tarea no existe en la base de datos' }));
                    return;
                }

                const task = rows[0];

                //Logica de protección: Comparamos el autor del JSON con el autor de la fila de MySQL
                if (task.author !== author) {
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'error', message: `No autorizado. La tarea es de ${task.author}` }));
                    return;
                }

                //Paso B: Si pasa el filtro, ejecutamos el borrado físico en la tabla
                await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success', data: null }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'error', message: 'fallo al  eliminar la base de datos ' + error.message }));
            }
        });
        return;
    }

    //404 - Ruta no encoontrada 
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: 'Endpoint no encontrado' }));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor vainilla con MYSQL real corriendo en http://localhost:${PORT}`);
});


