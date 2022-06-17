import {
    FORMULARIO_ALERTA,
    OCULTAR_ALERTA,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR
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
                // localStorage.setItem('token', action.payload.token);
                return{
                    ...state,
                    autenticado: true,
                    alerta: true,
                    mensajeErrorForm: action.payload 
                    // mensaje: null
            }
            
            case REGISTRO_ERROR:
                // localStorage.removeItem('token');
                return{
                    // ...state,
                    token: null,
                    alerta: true,
                    mensajeErrorForm: action.payload,
                    autenticado: false,
            }

        default:
            return state;
    }
}