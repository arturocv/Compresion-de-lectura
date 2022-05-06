import React, {useState} from 'react';
import Header from './Componentes/Header';
import Resumen from './Componentes/Resumen';
import Resultado from './Componentes/Resultado';
import Spinner from './Componentes/Spinner';

import styled from '@emotion/styled';
import Formulario from './Componentes/Formulario';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;
const ContenedorFormulario = styled.div`
  background-color: #FFF;
  padding: 3rem;
`

const App = () => {

	const [ resumen, guardarResumen] = useState({
		cotizacion: 0,
		datos: {
		  marca: '',
		  year: '',
		  plan: ''
		}
	});

	const [cargando, setCargando] = useState(false);

	//Extraer datos
	const {cotizacion, datos} = resumen;

	return (
		<Contenedor>
			<Header 
				titulo="Cotizador de Seguros"
			/>
			<ContenedorFormulario>
				<Formulario
					guardarResumen={guardarResumen}
					setCargando = {setCargando}
				/>

				{cargando ? <Spinner /> : null}				

				<Resumen 
					datos={datos}
				/>

				{!cargando 
					?
					<Resultado 
						cotizacion={cotizacion}
					/> 
					: null
				}
				
			</ContenedorFormulario>
		</Contenedor>
		
	)
}

export default App