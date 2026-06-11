// DOM - document object model
let titulo = document.getElementById("titulo");//Esto hace referencia al elemento con el id "titulo"
console.log(titulo); // Muestra el elemento h2 con el texto "Hola Mundo"

titulo.textContent = "Nuevo Titulo"; // Cambia el texto del elemento h2 a "Nuevo Titulo"

titulo.innerHTML = "<span>Titulo Modificado</span>"; // Cambia el contenido HTML del elemento h2, agregando un span con el texto "Titulo Modificado"