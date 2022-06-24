import React, {useContext, useEffect} from 'react';
import comprensionContext from '../../context/auth/comprensionContext';


const PanelPrincipal = () => {
	const stateComprension = useContext(comprensionContext);
	const {usuario, usuarioAutenticado, cerrarSesion} = stateComprension;

	useEffect(() => {
		usuarioAutenticado();
	}, []);	

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

export default PanelPrincipal;