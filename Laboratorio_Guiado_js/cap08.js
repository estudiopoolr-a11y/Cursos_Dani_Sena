function saludar(){
    console.log("Hola, soy una función");
}
saludar();

//Sañudar con parametros
function saludo(nombre) {
    console.log(`Hola, ${nombre}`);
}
saludo("Carlos");

//Funcion con retorno
function sumar(a, b) {
    return a + b;
}
let resultado = sumar(5, 3);
console.log(resultado); // Muestra 8