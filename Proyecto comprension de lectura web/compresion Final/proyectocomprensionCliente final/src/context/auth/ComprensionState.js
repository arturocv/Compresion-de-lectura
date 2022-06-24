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
        cargando: true
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
            // payload: [msg, cssload]  
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
			// const respuesta = await axios.put('http://localhost:4000/api/addUsers', datos);
            const respuesta = await clienteAxios.put('addUsers', datos);
            console.log(respuesta.data.mensaje);

            const alert = {
				msg: respuesta.data.mensaje,
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

			// Obtener el usuario
			// usuarioAutenticado();
		} catch (error) {
            // console.log(error.response.data.mensaje);
			const alert = {
				msg: error.response.data.mensaje,
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
        console.log('desde auth: ' + token);

		if(token){         
            clienteAxios.defaults.headers.common['x-auth-token'] = token;
		}else{
            delete clienteAxios.defaults.headers.common['x-auth-token'];
        }
        // const header = {
        //     headers: {
        //         "content-type": "application/json"
        //     }
        // };

		try {
			// const respuesta = await axios.get('http://localhost:4000/api/login');
            const respuesta = await clienteAxios.get('/login');
            console.log("Desde auth: "+ respuesta);
			dispatch({
				type: OBTENER_USUARIO,
				payload: respuesta.data[0]
			})
		} catch (error) {
            const alert = {
				msg: error.response.data.mensaje,
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
			// const respuesta = await axios.post('http://localhost:4000/api/login', data);
            const respuesta = await clienteAxios.post('/login', data);
			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data
			});
            setTimeout(() => {
                usuarioAutenticado();
            }, 1000)
		} catch (error) {
			// console.log(error.response);
            const alert = {
				msg: error.response.data.mensaje,
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
            }, 5);
		}
	}

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
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