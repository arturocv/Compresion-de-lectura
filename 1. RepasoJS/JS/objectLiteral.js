const banda = "Metallica";
const genero = "Heavy Metal";
const canciones = ['Master of puppet', 'seek', 'enter'];

//Forma anterior
const metallica = {
    banda: banda,
    genero: genero,
    canciones: canciones
}

//Forma nueva

const metallicaNueva = {banda, genero, canciones};

console.log(metallicaNueva);