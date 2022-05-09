import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Formtarea = () => {
    // Extrar si un proyectoe sta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;


    if(!proyecto) return null;

    const [proyectoActual] = proyecto;

    return (
        <div className="formulario">
                <form
                    //onSubmit={onSubmit}
                >
                    <div className="contenedor-input">
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre Tarea..."
                            name="nombre"
                            //value={nombre}
                            //onChange={handleChange}
                        />
                    </div>

                    <div className="contenedor-input">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-submit btn-block"
                            //value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                        />
                    </div>
                </form>

                {/* {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null } */}
            </div>
    )
}

export default Formtarea