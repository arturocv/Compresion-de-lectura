
// obtiene la diferencia de años
export function obtenerDiferenciaYear(year) {
    return new Date().getFullYear() - year;
}

// calcula el total a pagar segun la marca
export function calcularMarca(marca) {
    let incremento;

    if(marca == 'europeo'){
        incremento = 1.30;
    }else if(marca == 'americano'){
        incremento = 1.15;
    }else if(marca == 'asiatico'){
        incremento = 1.05;
    }

    return incremento;    

    // switch(marca) {
    //     case 'europeo':
    //         incremento = 1.30;
    //         break;
    //     case 'americano':
    //         incremento = 1.15;
    //         break;
    //     case 'asiatico':
    //         incremento = 1.05;
    //         break
    //     default:
    //         break;
    // }

    
}

// Calcula el tipo de seguro
export function obtenerPlan( plan ) {
    // return (plan === 'basico') ? 1.20 : 1.50;

    let intPlan;
    if(plan == 'basico'){
        intPlan = 1.20;
    }else if(plan == 'completo'){
        intPlan = 1.50;
    }

    return intPlan;
}

// Muestra la primer letra mayuscula
export function primerMayuscula( texto ) {

    //console.log(texto);
    //const txt = texto.charAt(0).toUpperCase() + texto.slice(1);

    const txt = toString(texto).charAt(0).toUpperCase();
    console.log("texto modificado: " + txt);

    //return txt;
}