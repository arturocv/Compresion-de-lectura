import React, {useState} from 'react';
import { Error } from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({setGasto, setCreargasto}) => {

    const [nombreGasto, setNombreGasto] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState(false);

    //Cuando el usuario agrega un gasto
    
    const agregarGasto = (e) => {
        e.preventDefault();

        //Validar
        if(cantidad < 1 || isNaN(cantidad) || nombreGasto.trim() === ''){
            setError(true);
            return;
        }
        setError(false);

        //Construir el gasto
        const gasto = {
            nombreGasto,
            cantidad,
            id: shortid.generate()
        }

        //Pasar el gasto al componente principal
        setGasto(gasto);
        setCreargasto(true);

        //Resetear el form
        setNombreGasto('');
        setCantidad(0);

    }

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Coloca tus gastos aquí</h2>
            {error ? <Error mensaje="Ambos campos son obligatorios" /> : null }

            <div className='campo'>
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className='u-full-width'
                    placeholder='Ej. Transporte'
                    value={nombreGasto}
                    onChange={e => setNombreGasto(e.target.value)}
                />
            </div>
            <div className='campo'>
                <label>Cantidad Gasto</label>
                <input 
                    type="number"
                    className='u-full-width'
                    placeholder='Ej. $300'
                    value={cantidad}
                    onChange={e => setCantidad(parseInt(e.target.value), 10)}

                />
            </div>
            <input 
                type= 'submit'
                className='button-primay u-full-width'
                value="Agregar Gasto"
            />
        </form>
    )
}

Formulario.propTypes = {
	setGasto: PropTypes.func.isRequired,
    setCreargasto: PropTypes.func.isRequired
}


export default Formulario;