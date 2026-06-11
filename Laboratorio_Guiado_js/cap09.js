let frutas = [
    "Manzana",
    "Banana",
    "Naranja"
];

console.log(frutas); // Muestra el array completo

//Acceder a los elementos del array
console.log(frutas[0]); // Muestra "Manzana"
console.log(frutas[1]); // Muestra "Banana"
console.log(frutas[2]); // Muestra "Naranja"

//Metodos para agregar o eliminar elementos del array
frutas.push("Pera"); // Agrega "Pera" al final del array
console.log(frutas);

frutas.pop(); // Elimina el último elemento del array
console.log(frutas);

frutas.unshift("Fresa"); // Agrega "Fresa" al inicio del array
console.log(frutas);

frutas.shift(); // Elimina el primer elemento del array
console.log(frutas);