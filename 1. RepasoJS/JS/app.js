const viajando = (destino) => {
    console.log(`La persona esta viajando a ${destino}`);
}

//viajando("Barranquilla");

let llamar = (e) => {
     console.log(`Llamar a ${e} a las 6:00 pm`);
};

//llamar("Fernando");

//OBJETOS EN JS LITERAL

const persona = {
    nombre: "Arturo",
    profesion: "Desarrollador",
    edad: 40
}
console.log(persona.nombre);

//OBJETO CONSTRUCTOR
function Tarea(nombre, tarea){
    this.nombre = nombre,
    this.tarea = tarea
}

const tarea1 = new Tarea("Arturo", "crear el login");
console.log(tarea1);