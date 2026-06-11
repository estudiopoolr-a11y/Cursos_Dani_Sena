//Objetos en javascript
let usuario = {
    nombre: "Carlos",
    edad: 28,
    activo: true
};
console.log(usuario);

//Acceder a las propiedades del objeto
console.log(usuario.nombre); // Muestra "Carlos"
console.log(usuario["edad"]); // Muestra 28

//Modificar propiedades del objeto
usuario.cuidad = "Madrid"; // Agrega una nueva propiedad "ciudad"
console.log(usuario);