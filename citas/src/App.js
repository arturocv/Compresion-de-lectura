import React, { Fragment, useState,useEffect } from "react";
import Formulario from "./Componentes/Formulario";
import Cita from "./Componentes/Cita";

function App() {

	//Citas en local Storage
	let citasIniciales = JSON.parse(localStorage.getItem('citas'));
	if(!citasIniciales){
		citasIniciales = [];
	}


  	const [citas, setcitas] = useState(citasIniciales);

  	//UseEffect para realizar ciertas operaciones cuando el state cambia
	useEffect( () => {
		let citasIniciales = JSON.parse(localStorage.getItem('citas'));
		if(citasIniciales){
			localStorage.setItem('citas', JSON.stringify(citas));
		}else{
			localStorage.setItem('citas', JSON.stringify([]));
		}
	}, [citas]);



  //Funcion de guardar citas
  const crearCita = (cita) => {
    console.log(cita);
	setcitas([
		...citas,
		cita
	])
  };


  //funcion que elimina una cita por su ID
  const eliminarCita = (id) => {
	  const nuevasCitas = citas.filter(cita => cita.id !== id);

	  setcitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
		<h1>Administrador de Pacientes</h1>

		<div className="container">
			<div className="row">
				<div className="one-half column">
					<Formulario 
						crearCita = {crearCita}
					/>
				</div>
				<div className="one-half column">

					<h2>{titulo}</h2>
					{
						citas.map(cita => (
							<Cita 
								key={cita.id}
								cita={cita}
								eliminarCita={eliminarCita}
							/>
						))
					}
				</div>
			</div>
		</div>
    </Fragment>
  );
}

export default App;
