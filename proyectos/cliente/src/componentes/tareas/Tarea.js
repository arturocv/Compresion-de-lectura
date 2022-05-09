import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({homework}) => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, obtenerTareas } = proyectosContext;

    console.log(homework.nombre);


    return (
        <li className="tarea sombra">
                {/* <p>{tarea.nombre} </p> */}

                {/* <div className="estado">
                    {tarea.estado 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleto</button>
                        )
                    }
                </div> */}

                <div className="acciones">
                    <button 
                        type="button"
                        className="btn btn-primario"
                        // onClick={() => seleccionarTarea(tarea) }
                    >Editar</button>

                    <button
                        type="button"
                        className="btn btn-secundario"
                        // onClick={() => tareaEliminar(tarea._id)}
                    >Eliminar</button>
                </div>
            </li>
    )
    }

export default Tarea