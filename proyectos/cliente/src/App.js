import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from "react-router-dom";
import Login from './componentes/auth/Login';
import NuevaCuenta from './componentes/auth/NuevaCuenta';
import Proyectos from './componentes/proyectos/Proyectos';
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/tareaState';

const App = () => {
	return (
		<ProyectoState>
			<Router>
				<Routes>
					<Route exac path='/' element={ <Login /> } />
					<Route exac path='/nueva-cuenta' element={<NuevaCuenta />} />
					<Route exac path='/proyectos' element={<Proyectos/>} />
				</Routes>
			</Router>
		</ProyectoState>
	)
}

export default App


