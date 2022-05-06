import React, {useState} from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear,  calcularMarca, obtenerPlan} from "../helpers";
import PropTypes from 'prop-types';

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;
const Label = styled.label`
  flex: 0 0 100px;
`;
const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;
const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen, setCargando}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: '',
    });

    //Control de errores State
    const [ error, guardarError ] = useState(false);

    //Extraer valores del state
    const {marca, year, plan} = datos;

    //Leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: [e.target.value]
        })

    }

    const cotizarSeguro = (e) => {
        e.preventDefault();

        if(marca === "" || year === "" || plan === ""){
            guardarError(true);
            return;
        }

        guardarError(false);

        //Una base de 2000
        let resultado = 2000;

        //Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        //Por cada año hay que restar 3%
        resultado -= ((diferencia * 3)*resultado) / 100;

        //Calcular marca
        resultado = calcularMarca(marca) * resultado;

        //Obtenre valor del plan
        const incrementoPlan = obtenerPlan(plan);

        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

        //Se carga el Spinner
        setCargando(true);


        //Funcion para cargar el Spiner durante 3 segundo
        setTimeout(() => {
            //Se elimina el Spinner
            setCargando(false);

            //Mostrar el resumen
            guardarResumen({
                cotizacion: resultado,
                datos
            });
        }, 3000);
        

    }

    return (
        <form
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Todos los campos son obligatorios</Error>  : null }
        <Campo>
            <Label>Marca</Label>
            <Select
                name="marca"
                value= {marca}
                onChange={obtenerInformacion}
            >
                <option value="">-- Seleccione --</option>
                <option value="americano">Americano</option>
                <option value="europeo">Europeo</option>
                <option value="asiatico">Asiatico</option>
            </Select>
        </Campo>
        <Campo>
            <Label>Año</Label>
            <Select
                name="year"
                value= {year}
                onChange={obtenerInformacion}
            >
                <option value="">-- Seleccione --</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
            </Select>
        </Campo>
        <Campo>
            <Label>Plan</Label>
            <InputRadio 
                type="radio"
                name="plan"
                value="basico"
                // checked={plan === "basico"}
                onChange={obtenerInformacion}
            /> Básico

            <InputRadio 
                type="radio"
                name="plan"
                value="completo"
                // checked={plan === "completo"}
                onChange={obtenerInformacion}
            /> Completo
            </Campo>
        <Boton type="submit">Cotizar</Boton>
        </form>
    );
};

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}

export default Formulario;
