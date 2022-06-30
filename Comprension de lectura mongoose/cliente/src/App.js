import React, { Fragment } from 'react';
import {BrowserRouter as Router,
        Routes,
        Route
} from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
// import AnimacionLogo from './Animations/logo/AnimacionLogo';
import PanelEstudiante from './components/panel estudiante';
import ComprensionState from './context/auth/ComprensionState';


import './App.scss';

const App = () => {
	return (
		<ComprensionState>
			<Router>
				<Routes>
					<Route exac path={'/'} element={ <Login />} />
					<Route exac path={'/registro'} element={ <Register />} />
					<Route exac path={'/panelEstudiante'} element={ <PanelEstudiante />} />
				</Routes>
			</Router>
		</ComprensionState>
	)
}

export default App