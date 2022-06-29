import React from 'react';
import {BrowserRouter as Router,
        Routes,
        Route
} from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import PanelPrincipal from './components/actividades'
import ComprensionState from './context/auth/ComprensionState';
import Prueba from './components/prueba/Prueba';
import RutasPrivadas from './components/rutas/RutasPrivadas';
// import axios from 'axios';
import { clienteAxios } from './config';

import './App.scss';

//Revisar si tenemos un token
const token = localStorage.getItem('token');    

if(token){         
	clienteAxios.defaults.headers.common['x-auth-token'] = token;
}else{
	delete clienteAxios.defaults.headers.common['x-auth-token'];
}

const App = () => {
	return (
		<ComprensionState>
			<Router>
				<Routes>
					<Route exac path={'/'} element={ <Login />} />
					<Route exac path={'/registro'} element={ <Register />} />
					{/* <Route exac path={'/panelEstudiante'} element={ <PanelPrincipal />} /> */}
					<Route exact path='/panelEstudiante' element={<RutasPrivadas component={PanelPrincipal}/>}/>
					<Route exac path={'/prueba'} element={ <Prueba />} />
				</Routes>
			</Router>
		</ComprensionState>
	)
}

export default App