import  {FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    TAREAS_PROYECTO,
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION 
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario: true
            }

        case OBTENER_PROYECTOS:
            return{
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return{
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false
            }
        
            case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }

            case PROYECTO_ACTUAL:
            return{
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto.id === action.payload)
            }

            case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto.id !== action.payload),
                proyecto: null
            }

            case TAREAS_PROYECTO:
            return{
                ...state,
                tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
            }

            case MOSTRAR_ALERTA:
            return{
                alerta: action.payload
            }
            
            case OCULTAR_ALERTA:
            return{
                alerta: null
            }

            case REGISTRO_EXITOSO:
                localStorage.setItem('token', action.payload.token);
                return{
                    ...state,
                    autenticado: true,
                    mensaje: null
                }
            
            case REGISTRO_ERROR:
                localStorage.removeItem('token');
                return{
                    ...state,
                    token: null,
                    mensaje: action.payload
                }

            case OBTENER_USUARIO:
                return{
                    ...state,
                    usuario: action.payload
                }
            
            case LOGIN_ERROR:


        default:
            return state;
    }
}