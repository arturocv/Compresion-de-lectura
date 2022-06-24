import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined,  LockOutlined, 
		MailOutlined, EnvironmentOutlined, 
		KeyOutlined, } from '@ant-design/icons';
import AnimacionLogo from '../../Animations/logo/AnimacionLogo';
import ImgRegister from '../../images/logoInicioSesion.png';
import Alerta from '../Alertas/Alert';
import comprensionContext from '../../context/auth/comprensionContext';

const Login = () => {
	let navigate = useNavigate();
	const stateComprension = useContext(comprensionContext);
	const {loginUsuario, autenticado, usuarioAutenticado} = stateComprension;
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
			console.log('Todos los campos son obligatorios');
		}
		const Usuario = {			
			email,			
			password
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
						<img src={ImgRegister}/>
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