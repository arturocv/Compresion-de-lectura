const persona = {
    nombre: "Arturo",
    apellido: "Camargo",
    edad: 40,
    musica: "variada",

    mostrarInformacion: function(){
        console.log(`${this.nombre} tiene ${this.edad} y escucaha musica ${this.musica}`);
    }
}

persona.mostrarInformacion();