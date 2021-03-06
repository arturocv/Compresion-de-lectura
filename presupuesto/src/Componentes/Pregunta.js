import React, { Fragment, useState } from 'react';
import {Error} from './Error';
import PropTypes from 'prop-types';

const Pregunta = ({setPresupuesto, setRestante, setMostrarpegunta}) => {

    //Definir estado de la cantidad de dinero
	const [cantidad, setCantidad] = useState(0);

    const [error, setError] = useState(false);

    const definirPresupuesto = (e) => {
        setCantidad(parseInt(e.target.value));
    }
    
    //Submit para definir presupuesto
    const agregarPresupuesto = (e) => {
        e.preventDefault();

        //Validar
        if(cantidad < 1 || isNaN(cantidad)){
            setError(true);
            return;
        }       

        //si pasa la validacion
        setError(false);
        setPresupuesto(cantidad);
        setRestante(cantidad)
        setMostrarpegunta(false);
    }

    return (
        <Fragment>
            <h2>Coloca tu presupuesto</h2>
            {error ?<Error 
                        mensaje="El presupuesto es incorrecto"
                    /> : null}
            <form
                onSubmit={agregarPresupuesto}
            >
                <input 
                    type= "number"
                    className='u-full-width'
                    placeholder='Coloca tu presupuesto'
                    onChange={definirPresupuesto}
                />
                <input 
                    type="submit"
                    className='button-primary u-full-width'
                    value= 'Definir Presupuesto'
                />
            </form>
        </Fragment>
    )
}

Pregunta.propTypes = {
	setPresupuesto: PropTypes.func.isRequired,
    setRestante: PropTypes.func.isRequired,
    setMostrarpegunta: PropTypes.func.isRequired
}

export default Pregunta;