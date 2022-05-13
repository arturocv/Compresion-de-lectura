import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { v4 as uuidv4 } from 'uuid';
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
import { type } from '@testing-library/user-event/dist/type';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const ProyectoState = (props) => {

	const proyectos = [
		{id: 1, nombre: 'Tienda Virtual'},
		{id: 2, nombre: 'Intranet'},
		{id: 3, nombre: 'Sites Web'}
	]

	const initialState ={
		formulario: false,
		proyectos: [ ],
		errorformulario: false,
		proyecto: null,

		tareas : [
            {nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {nombre: 'Elegir Colores', estado: false,  proyectoId: 2},
            {nombre: 'Elegir Plataforma de pago', estado: false,  proyectoId: 3},
            {nombre: 'Elegir Hosting', estado: true,  proyectoId: 4},
			{nombre: 'Elegir Colores', estado: false,  proyectoId: 1},
            {nombre: 'Elegir Plataforma de pago', estado: false,  proyectoId: 3},
            {nombre: 'Elegir Hosting', estado: true,  proyectoId: 4},
			{nombre: 'Elegir Colores', estado: false,  proyectoId: 2},
            {nombre: 'Elegir Plataforma de pago', estado: false,  proyectoId: 1},
            {nombre: 'Elegir Hosting', estado: true,  proyectoId: 2},
			{nombre: 'Elegir Colores', estado: false,  proyectoId: 4},
            {nombre: 'Elegir Plataforma de pago', estado: false,  proyectoId: 3},
            {nombre: 'Elegir Hosting', estado: true,  proyectoId: 1},
        ],
		tareasproyecto: null,	
		alerta: null,
		token: localStorage.getItem('token'),
		autenticado: null,
		usuario: null,
		mensaje: null
	}

	//Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(proyectoReducer, initialState);


	//Serie de funciones para el CRUD
	const mostrarFormulario = () => {
		dispatch({
			type: FORMULARIO_PROYECTO
		})
	}

	//Obtener los proyectos 
	const obtenerProyectos = () => {
		dispatch({
			type: OBTENER_PROYECTOS,
			payload: proyectos
		})
	}

	const agregarProyecto = proyecto => {
		proyecto.id = uuidv4();

		//Insertar el pryecto en el State
		dispatch({
			type: AGREGAR_PROYECTO,
			payload: proyecto
		})
	}

	//Valida formulario por errores
	const mostrarError = () => {
		dispatch({
			type: VALIDAR_FORMULARIO
		})
	}

	//Selecciona el proyecto que el usuario dio click
	const proyectoActual = (proyectoId) => {
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoId
		})
	}

	//Elimina un proyecto
	const eliminarProyecto = proyectoId => {
		dispatch({
			type: ELIMINAR_PROYECTO,
			payload: proyectoId
		})
	}

	//cREAR FUNCIONES PARA LAS TAREAS
	const obtenertareas = proyectoId => {
		dispatch({
			type: TAREAS_PROYECTO,
			payload: proyectoId
		})
	}

	const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type:  MOSTRAR_ALERTA,
            payload: {
                msg, 
                categoria
            }
        });

        // Después de 5 segundos limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }

	const registrartUsuario = async datos => {
		try {
			const respuesta = await clienteAxios.post('/api/usuarios', datos);
			// console.log(respuesta);  //Validar la respuesta por consola para ver conexion
 
			dispatch({
				type: REGISTRO_EXITOSO,
				payload: respuesta.data
			});

			//Obtener el usuario
			usuarioAutenticado();
		} catch (error) {
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			}

			dispatch({
				type: REGISTRO_ERROR,
				payload: alerta
			})
		}
	}

	//Retorna el usuario autenticado
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem('token');
		if(token){
			//Funcion para enviar el token por headers
			tokenAuth(token);
		}

		try {
			const respuesta = await clienteAxios('/api/auth');
			console.log("desde respuesta: " + respuesta);
			dispatch({
				type: OBTENER_USUARIO,
				payload: respuesta.data
			})
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: LOGIN_ERROR
			})
		}
	}

	return(
		<proyectoContext.Provider
			value={{
				formulario: state.formulario,
				proyectos: state.proyectos,
				errorformulario: state.errorformulario,
				proyecto: state.proyecto,
				tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				alerta: state.alerta,
				token: state.token,
				autenticado: state.autenticado,	
				usuario: state.usuario,
				mensaje: state.mensaje,
				mostrarFormulario,	
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
				proyectoActual,
				eliminarProyecto,
				obtenertareas,
				mostrarAlerta,
				registrartUsuario			
				
			}}
		>
			{props.children}
		</proyectoContext.Provider>
	)
}

export default ProyectoState