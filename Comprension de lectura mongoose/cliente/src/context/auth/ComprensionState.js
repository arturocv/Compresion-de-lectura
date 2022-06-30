import React, {useReducer} from 'react';
import comprensionContext from './comprensionContext';
import comprensionReducer from './compresionReducer';
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
import { clienteAxios } from '../../config';

const ComprensionState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        alerta: false,
        mensajeErrorForm: null,
        autenticado: false,
		mensaje: null,
        usuario: null, 
        cargando: true,
        registrado: false
    }
    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(comprensionReducer, initialState);


    //Serie de funciones para modificar el State

    //Modifica el state de alerta
    const formularioAlerta = (msg, cssload) => {
        const alert = {
            msg,
            cssload
        }
        dispatch({
            type: FORMULARIO_ALERTA,
            payload: alert          
        });

        // Después de 3 segundos limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }

    //Agregar usuario
    const registrarUsuario = async datos => {
		try {
            const respuesta = await clienteAxios.post('addUser', datos);

            const alert = {
				msg: respuesta.data.msg,
				cssload: 'success'
			} 
			dispatch({
				type: REGISTRO_EXITOSO,
				payload: alert
			});
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA
                })
            }, 3000);
            
		} catch (error) {
			const alert = {
				msg: error.response.data.msg,
				cssload: 'error'
			}
			dispatch({
				type: REGISTRO_ERROR,
				payload: alert
			});
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA
                })
            }, 2000);            
		}
	}

    const usuarioAutenticado = async () => {        
		const token = localStorage.getItem('token');    
		if(token){         
            clienteAxios.defaults.headers.common['x-auth-token'] = token;
		}else{
            delete clienteAxios.defaults.headers.common['x-auth-token'];
        }

		try {
            const respuesta = await clienteAxios.get('/login');
            // console.log(respuesta.data.user);            
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.user
            });            
		} catch (error) {
            const alert = {
				msg: error.response.data.msg,
				cssload: 'error'
			}
			dispatch({
				type: AUTH_ERROR,
                payload: alert
			})

            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA
                })
            }, 2000);
		}
        
	}


    //Cuando el usuario Inicia Sesion
    const loginUsuario = async (data) => {        
		try {
            const respuesta = await clienteAxios.post('/login', data);
			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data,                
			});  
      
            setTimeout(() => {
                usuarioAutenticado();
            }, 5)
		} catch (error) {
            const alert = {
				msg: error.response.data.msg,
				cssload: 'error'
			}
			dispatch({
				type: LOGIN_ERROR,
                payload: alert
			})
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA
                })
            }, 3000);
		}
        
	}

    const cerrarSesion = () => {        
        const alert = {
            msg: '',
            cssload: ''
        }
        dispatch({
            type: CERRAR_SESION,
            payload: alert
        });        
    }


    return (
        <comprensionContext.Provider
            value={{
                alerta: state.alerta,
                mensajeErrorForm: state.mensajeErrorForm,
                autenticado: state.autenticado,
                usuario: state.usuario,
                token: state.token,
                cargando: state.cargando,
                registrado: state.registrado,
                formularioAlerta,  
                registrarUsuario,
                loginUsuario,
                usuarioAutenticado,
                cerrarSesion              
            }}
        >{props.children}

        </comprensionContext.Provider>
    )
}

export default ComprensionState;