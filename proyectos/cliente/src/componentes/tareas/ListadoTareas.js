import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
// import tareaContext from '../../context/tareas/tareaContext';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    // Extrar proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto, tareasproyecto } = proyectosContext;

    if(!proyecto) return <h2>Selecciona un Proyecto</h2>;

    //Array destructuring para extreae el proyecto actual
    const [proyectoActual] = proyecto;

    // Elimina un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id)
    }

    return (
        <Fragment>
                <h2>Proyecto: {proyectoActual.nombre} </h2>

                <ul className="listado-tareas">
                    {tareasproyecto.length === 0
                        ?   (<li className="tarea"><p>No hay tareas</p></li>)

                        :   tareasproyecto.map(homework => (
                            // console.log(homework),
                            <Tarea 
                                homework={homework}                                
                            />
                        ))
                    }
                </ul>

                {/* <ul className="listado-tareas">
                    {tareasproyecto.length === 0 
                        ? (<li className="tarea"><p>No hay tareas</p></li>) 
                        : 
                        <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea 
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                        </TransitionGroup>
                    }
                </ul> */}
                <Tarea />


                <button     
                    type="button"
                    className="btn btn-eliminar"
                    onClick={onClickEliminar}
                >Eliminar Proyecto &times;</button>
            </Fragment>
    )
}

export default ListadoTareas