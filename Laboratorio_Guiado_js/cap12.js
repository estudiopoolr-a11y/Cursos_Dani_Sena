//Seleccionar elementos con querySelector
let titulo = document.querySelector("#titulo"); // Selecciona el elemento con el id "titulo"
console.log(titulo); // Muestra el elemento h1 con el texto "Query Selector"

let subtitulo = document.querySelector(".subtitulo");// Selecciona el primer elemento con la clase "subtitulo"
console.log(subtitulo); // Muestra el elemento h2 con el texto "Hola Mundo"

let parrafo = document.querySelector(".parrafo"); // Selecciona el primer elemento con la clase "parrafo"
console.log(parrafo); // Muestra el elemento p con el texto "Este es un párrafo de ejemplo."    

let elementos = document.querySelectorAll("li"); // Selecciona todos los elementos li
console.log(elementos); // Muestra una NodeList con los elementos li