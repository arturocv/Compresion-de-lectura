import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
  //Crear State de citas
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  //Funcion que se ejecuta cada que el usuario escribe en un Input

  const actualizarState = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  //Extraer valores del formulario
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const [error, seterror] = useState(false);

  const submitCita = (e) => {
    e.preventDefault();

    //Validar FOrmaulario
	if( mascota.trim() === '' || 
		propietario.trim() === '' ||
		fecha.trim() === '' ||
		hora.trim() === '' ||
		sintomas.trim() === ''
	){
		console.log('hay un error');
		seterror(true);
		return;
	}
	seterror(false);

    //Asignar ID
	cita.id = uuidv4();

    //Crear la cita
	crearCita(cita);

    //Reiniciar el formulario
	setCita({
		mascota: "",
		propietario: "",
		fecha: "",
		hora: "",
		sintomas: "",
	})

  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>

	  {
		  error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null
	  }
      <form onSubmit={submitCita}>
        <label>Nombre de Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="nombre mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del dueño"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label></label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired

}



export default Formulario;
