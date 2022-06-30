import {
    FORMULARIO_ALERTA,
    OCULTAR_ALERTA,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    AUTH_ERROR,
    CERRAR_SESION
} from '../../types';


export default (state, action) => {
    switch(action.type){
        case FORMULARIO_ALERTA:
            return {
                alerta: true,
                mensajeErrorForm: action.payload                
            }
        
            case OCULTAR_ALERTA:
            return {
                alerta: false,
                autenticado: false,               
            }

            case REGISTRO_EXITOSO:
                return{
                    ...state,
                    alerta: true,
                    mensajeErrorForm: action.payload 
                    // mensaje: null
            }
            
            case REGISTRO_ERROR:
                return{
                    // ...state,
                    alerta: true,
                    mensajeErrorForm: action.payload,
                    autenticado: false,
            }

            case LOGIN_ERROR:
                localStorage.removeItem('token');
                return{
                    // ...state,
                    autenticado: false,
                    // token: null,
                    alerta: true,
                    mensajeErrorForm: action.payload,
                    cargando: false
            }

            
            case AUTH_ERROR:
                localStorage.removeItem('token');
                return{
                    autenticado: false,
                    token: null,
                    // usuario: null,
                    alerta: true,
                    mensajeErrorForm: action.payload,
                    cargando: false
                }
            
            case CERRAR_SESION:
                localStorage.removeItem('token');
                return{
                    autenticado: false,
                    token: null,
                    usuario: null,
                    alert: false,
                    mensajeErrorForm: action.payload
                }

            case OBTENER_USUARIO:
                return{
                    ...state,
                    usuario: action.payload,  
                    autenticado: true,
                    cargando: false,
                }
            
            case LOGIN_EXITOSO:
                localStorage.setItem('token', action.payload.token);
                return {
                    // ...state,
                    alert: false,
                    autenticado: true,
                    mensajeErrorForm: null,
                    cargando: false,
                    
                }

        default:
            return state;
    }
}