import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import AnimacionLogo from '../../Animations/logo/AnimacionLogo';
import RegisterAnim from '../../images/logoInicioSesion.png';
import Alerta from '../Alertas/Alert';
import comprensionContext from '../../context/auth/comprensionContext';

const Login = () => {
	let navigate = useNavigate();
	const stateComprension = useContext(comprensionContext);
	const {loginUsuario, autenticado, usuarioAutenticado, formularioAlerta} = stateComprension;
	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const {email, password} = user;
	const onChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const login = async (e) => {
		if(email === '' || password === ''){
			formularioAlerta('Todos los campos son obligatorios', 'error');
			return
		}
		loginUsuario({
			email,
			password
		});		
	}

	useEffect(() => {
		if(autenticado === true){
			navigate("/panelEstudiante");
		}	
	});

	return (
		<div className='contenido-general'>
			<div className='contenedor'>
				<div className='login-izq'>
					<div className="animacion-logo" >
						<AnimacionLogo />
					</div>
				</div>
					<div className='login-der'>
						<img src={RegisterAnim} alt="logo de la animacion"/>
						<p>INICIO DE SESION</p>
						<Alerta />				
						<Form className="register-form" onFinish={login}>					
							<Form.Item className='ant-form-item-login'>
								<Input
									name="email"		
									prefix={<MailOutlined type="email" style={{ color: "rgba(0,0,0,.25)" }} />}
									type="email"
									placeholder="Correo electronico"
									className="register-form__input"
									value={email}
									onChange={onChange}
								/>
							</Form.Item>					
							<Form.Item className='ant-form-item-login'>
								<Input
									prefix={<LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
									type="password"
									name="password"
									placeholder="Contraseña"
									className="register-form__input"
									value={password}
									onChange={onChange}
								/>
							</Form.Item>
							<Form.Item>		 
								<Button type="primary" htmlType="submit" className="login-form-button">
									Iniciar Sesión
								</Button>
							</Form.Item>
						</Form>
						<div className='div-enlace-cuenta'>
							<Link to={'/registro'} className="enlace-cuenta">
								Obtener Cuenta
							</Link>
						</div>
					</div>
			</div>
		</div>
  	)
}

export default Login