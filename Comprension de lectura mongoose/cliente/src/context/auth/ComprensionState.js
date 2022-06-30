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
import clienteAxios from '../../config/axios';
import axios from 'axios';

const ComprensionState = (props) => {
    const initialState = {
        alerta: false,
        mensajeErrorForm: null,
        autenticado: null,
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

    const registrarUsuario = async datos => {

		try {
			const respuesta = await axios.post('http://localhost:4000/registro', datos);
			console.log(respuesta.data);  //Validar la respuesta por consola para ver conexion
 
			dispatch({
				type: REGISTRO_EXITOSO,
				payload: respuesta.data
			});
			// //Obtener el usuario
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
            }, 3000);
		}
	}

    const usuarioAutenticado = async () => {
		const token = localStorage.getItem('token');
		if(token){
			//Funcion para enviar el token por headers
			// tokenAuth(token);
		}

		try {
			const respuesta = await axios.get('/login');
			console.log("desde respuesta: " + respuesta);
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
                registrarUsuario              
            }}
        >{props.children}

        </comprensionContext.Provider>
    )
}

export default ComprensionState;