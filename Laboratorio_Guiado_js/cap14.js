/* Seleccionar el formulario y enviar el evento (refactorizado para evitar la repetición del evento)
let formulario = document.querySelector("#formulario");

Evento para el envío del formulario
formulario.addEventListener("submit", function(event) {
event.preventDefault(); // Evitar el envio del formulario

Capturar el valor del input
let nombre = document.querySelector("#nombre").value;

console.log("Formulario enviado");
console.log(nombre); // Mostrar el valor del input
*/

//Seleccionar el formulario
let formulario = document.querySelector("#formulario");

formulario.addEventListener(
    "submit",
    function(event) {
        event.preventDefault(); // Evitar el envio del formulario
        console.log("Formulario enviado");
    }
);

//Capturar el valor del input
let nombre =
    document.querySelector("#nombre");

    formulario.addEventListener(
        "submit",
        function(event) {
            event.preventDefault(); // Evitar el envio del formulario
            console.log(nombre.value); // Mostrar el valor del input
        }
    )