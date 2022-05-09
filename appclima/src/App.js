import React, {Fragment} from 'react';
import Header from './Componentes/Header';
import Formulario from './Componentes/Formulario';

const App = () => {
  return (
    <Fragment>
		<Header 
			titulo= "Clima React App"
		/>

		<div className="contenedor-form">
            <div className="container">
                <div className="row">
                    <div className="col m6 s12">
                        <Formulario 
                        //   busqueda={busqueda}
                        //   guardarBusqueda={guardarBusqueda}
                        //   guardarConsultar={guardarConsultar}
                        />
                    </div>
                    <div className="col m6 s12">
                        {/* {componente} */}
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default App;