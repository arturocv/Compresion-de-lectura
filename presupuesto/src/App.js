import React, { useEffect, useState } from 'react';
import Formulario from './Componentes/Formulario';
import Listado from './Componentes/Listado';
import Pregunta from './Componentes/Pregunta';
import ControlPresupuesto from './Componentes/ControlPresupuesto';

const App = () => {
	const [presupuesto, setPresupuesto] = useState(0);
	const [restante, setRestante] = useState(0);
	const [mostrarpegunta, setMostrarpegunta] = useState(true);
	const [gastos, setGastos] = useState([]);
	const [gasto, setGasto] = useState({ });
	const [creargasto, setCreargasto] = useState(false);

	//Use effects que actualiza el restante
	useEffect(() => {
		//Agrega al nuevo presupuesto 
		if(creargasto){
			setGastos([
				...gastos,
				gasto
			])
		}
		//Resta del presupuesto actual
		const presupuestoRestante = restante - gasto.cantidad;
		setRestante(presupuestoRestante);

		//Resetear a false
		setCreargasto(false);
	}, [gasto]);
	
	return (
		<div className='container'>
			<header>
				<h1>Gasto Semanal</h1>				

				<div className='contenido-principal contenido'>
					{ mostrarpegunta ? 
						(<Pregunta 
							setPresupuesto={setPresupuesto}
							setRestante={setRestante}
							setMostrarpegunta={setMostrarpegunta}
						/>)  : 
						(<div className='row'>
							<div className='one-half column'>
								<Formulario 
									setGasto={setGasto}
									setCreargasto={setCreargasto}
								/>
							</div>
							<div className='one-half column'>
								<Listado 
									gastos={gastos}
								/>

								<ControlPresupuesto 
									presupuesto={presupuesto}
									restante={restante}
								/>
							</div>
						</div>)
					}
				</div>
				
			</header>
			
		</div>
	)
}

export default App
