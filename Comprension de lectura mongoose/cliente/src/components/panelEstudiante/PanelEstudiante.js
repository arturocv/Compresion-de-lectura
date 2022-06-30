import React, { useContext } from 'react';
import comprensionContext from '../../context/auth/comprensionContext';


import './PanelEstudiante.scss';

const PanelEstudiante = () => {
	const stateCompresion = useContext(comprensionContext);
	const {usuario, cerrarSesion} = stateCompresion;

	return (
		<div>
			<h1>Panel Principal Estudiante</h1>
			{usuario ? <h3>Nombre: {usuario.nombres}</h3> : null}

			<nav>
				<button
					onClick={() => cerrarSesion()}
				>CERRAR SESION</button>
			</nav>
		</div>
	)
}

export default PanelEstudiante