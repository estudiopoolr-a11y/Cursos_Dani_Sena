//Seleccionar el boton
let boton = document.getElementById("miBoton");

//Agregar un evento de click al boton
boton.addEventListener("click", function() {
    alert("¡Botón clickeado!");
});

//Evento mouseover
boton.addEventListener("mouseover", function() {
    console.log("Mouse sobre el botón");
});

//Seleccionar el input
let input = document.getElementById("nombre");

//Evento de input
input.addEventListener("input", function() {
    console.log(input.value);
});