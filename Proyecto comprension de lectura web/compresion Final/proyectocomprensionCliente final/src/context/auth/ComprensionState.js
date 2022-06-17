import React, {useReducer} from 'react';
import comprensionContext from './comprensionContext';
import comprensionReducer from './compresionReducer';
import {
    FORMULARIO_ALERTA,
    OCULTAR_ALERTA,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR
} from '../../types';
import axios from 'axios';

const ComprensionState = (props) => {
    const initialState = {
        alerta: false,
        mensajeErrorForm: null,
        autenticado: false,
		mensaje: null
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
			const respuesta = await axios.put('http://localhost:4000/api/addUsers', datos);
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

    const usuarioAutenticado = async (data) => {
		// const token = localStorage.getItem('token');
		// if(token){
		// 	//Funcion para enviar el token por headers
		// 	// tokenAuth(token);
		// }

		try {
			const respuesta = await axios.post('http://localhost:4000/api/login', data);
			console.log(respuesta);
			// dispatch({
			// 	type: OBTENER_USUARIO,
			// 	payload: respuesta.data
			// })
		} catch (error) {
			// console.log(error.response);
			dispatch({
				type: LOGIN_ERROR
			})
		}
	}

    return (
        <comprensionContext.Provider
            value={{
                alerta: state.alerta,
                mensajeErrorForm: state.mensajeErrorForm,
                autenticado: state.autenticado,
                formularioAlerta,  
                registrarUsuario,
                usuarioAutenticado              
            }}
        >{props.children}

        </comprensionContext.Provider>
    )
}

export default ComprensionState;