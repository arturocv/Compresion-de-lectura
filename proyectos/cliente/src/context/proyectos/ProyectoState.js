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
		TAREAS_PROYECTO 
	} from '../../types';
import { type } from '@testing-library/user-event/dist/type';

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



	return(
		<proyectoContext.Provider
			value={{
				formulario: state.formulario,
				proyectos: state.proyectos,
				errorformulario: state.errorformulario,
				proyecto: state.proyecto,
				tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				mostrarFormulario,
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
				proyectoActual,
				eliminarProyecto,
				obtenertareas
				
				
			}}
		>
			{props.children}
		</proyectoContext.Provider>
	)
}

export default ProyectoState