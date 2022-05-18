import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { useNavigate } from 'react-router-dom';

const NuevaCuenta = () => {

    const history = useNavigate();

    //Extraer valores del context
    const proyectosContext = useContext(proyectoContext);
    const {alerta, mostrarAlerta, registrartUsuario, autenticado, mensaje} = proyectosContext;

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if(autenticado){
            // this.props.history.push('/proyectos');
            history("/proyectos");
        }
        if(mensaje){
            mostrarAlerta( mensaje.msg, 'alerta-error');

        }
        
    }, [mensaje, autenticado, history]);


    //State para iniciar sesion
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    let {nombre, email, password, confirmar} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: [e.target.value],
            
        });
        
    }

    //Cuando el usuario quiere iniciar Sesion
    const onSubmit = (e) => {
        e.preventDefault();

        //validacion del formulario
        if(nombre === '' || 
            email === '' || 
            password === '' ||
            confirmar === ''){

            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;

        }

        //Password minimo de 6 caractes
        if(password[0].length < 6){
            mostrarAlerta('La contraseña debe ser minino de 6 caracteres', 'alerta-error');
            return;
        }
        //Password iguales
        if(password[0] !== confirmar[0]){
            mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
            return;
        }

        //Pasarlo al action
        registrartUsuario({
            nombre,
            email, 
            password          
        });

    }

    return (
        <div className='form-usuario'>
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
            <div className='contenedor-form sombra-dark'>
                <h1>Crear Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Tu Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Tu contraseña'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    )
}

export default NuevaCuenta;