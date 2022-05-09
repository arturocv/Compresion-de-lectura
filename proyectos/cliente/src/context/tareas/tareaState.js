import React, {useReducer} from "react";
import tareaReducer from "./tareaReducer";
import TareaContext from "./tareaContext";


const TareaState = props => {

    const initialState = {
        tareas : [
            {nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {nombre: 'Elegir Colores', estado: false,  proyectoId: 2},
            {nombre: 'Elegir Plataforma de pago', estado: false,  proyectoId: 3},
            {nombre: 'Elegir Hosting', estado: true,  proyectoId: 4},
        ]
    }

    const [state, dispatch] = useReducer(tareaReducer, initialState);

    return(
        <TareaContext
            value= {{
                tarea: state.tarea
            }}
        >
            {props.children}
        </TareaContext>
    )
}

export default TareaState;