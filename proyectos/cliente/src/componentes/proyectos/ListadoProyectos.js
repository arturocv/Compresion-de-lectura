import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
// import AlertaContext from '../../context/alertas/alertaContext';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListadoProyectos = () => { 
    const proyectosContext = useContext(proyectoContext);
    const {proyectos, obtenerProyectos} = proyectosContext;

    useEffect(() => {
        obtenerProyectos();
    }, []);

    if(proyectos.length === 0) return <p>No hay proyectos</p>;


    return (

        <ul className="listado-proyectos">            
        
            {/* { alerta   ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  } */}
            
                {proyectos.map(proyecto => (                    
                    <Proyecto
                        key={proyecto.id} 
                        proyecto={proyecto}
                    />
                ))}
            
        </ul>
     );
}
 
export default ListadoProyectos;