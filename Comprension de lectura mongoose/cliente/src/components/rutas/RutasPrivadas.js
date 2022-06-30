import React, {Fragment, useContext, useEffect} from 'react';
import {Route, Navigate} from 'react-router-dom';
import comprensionContext from '../../context/auth/comprensionContext';


const RutasPrivadas = ({component: Component, ...props}) => {
    const stateComprension = useContext(comprensionContext);
	const {autenticado, cargando, usuarioAutenticado} = stateComprension;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return autenticado ? <Component/> : <Navigate to="/" />;
}

export default RutasPrivadas