import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined,  LockOutlined, 
		MailOutlined, EnvironmentOutlined, 
		KeyOutlined, } from '@ant-design/icons';
import AnimacionLogo from '../../Animations/logo/AnimacionLogo';
import ImgRegister from '../../images/logoRegistro.png';
import Alerta from '../Alertas/Alert';
import {useNavigate} from 'react-router-dom';
import comprensionContext from '../../context/auth/comprensionContext';


const Register = () => {
	let navigate = useNavigate();

	const [usuario, setUsuario] = useState({
		nombres: '',
		email: '',
		colegio: '',
		pin: '',
		password: '',
		repeatPassword: '',
		privacyPolicy: false
	});

	//Obtener el State del Context
	const stateComprension = useContext(comprensionContext);
	const {formularioAlerta, registrarUsuario, registrado} = stateComprension;

	// const pinDB = 'asdf1234';
	const [validapin, setValidaPin] = useState(false);
	const {nombres, email, institucion, pin, password, repeatPassword, privacyPolicy} = usuario;

	const onChange = (e) => {
		if (e.target.name === "privacyPolicy") {
			setUsuario({
				...usuario,
				[e.target.name]: e.target.checked
			});
		} else {
			setUsuario({
				...usuario,
				[e.target.name]: e.target.value
			});
		}
	};

	const register = async (e) => {
		if(nombres === '' || email === '' || institucion === '' || pin === '' ||  password === '' || repeatPassword === ''){
			formularioAlerta('Todos los campos son obligatorios', 'error');
			return;
		}
		if(password.length < 8 ){
			formularioAlerta('La contraseña debe tener al menos 8 caracteres', 'error');
			return;
		}
		if(password !== repeatPassword){
			formularioAlerta('Las contraseñas no coinciden','error');
			return;
		}
		if(!privacyPolicy){
			formularioAlerta('Acepte los terminos de politicas de privacidad', 'error');
			return;
		}		

		registrarUsuario({
			nombres, email, institucion, pin, password
		});
	}

	useEffect(() => {
		setTimeout(() => {
			if(registrado === true){
				navigate('/');
			}
		}, 2000)	
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
					<p>REGISTRO</p>
					<Alerta />				
					<Form className="register-form" onFinish={register}>
						<Form.Item className='ant-form-item'>
							<Input
								name="nombres"		
								prefix={<UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
								type="text"
								placeholder="Nombres"
								className="register-form__input"
								value={nombres}
								onChange={onChange}
							/>
						</Form.Item>
						<Form.Item className='ant-form-item'>
							<Input
								name="email"		
								prefix={<MailOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
								type="email"
								placeholder="Correo electronico"
								className="register-form__input"
								value={email}
								onChange={onChange}
							/>
						</Form.Item>
						<Form.Item className='ant-form-item'>
							<Input
								name="institucion"		
								prefix={<EnvironmentOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
								type="text"
								placeholder="Colegio"
								className="register-form__input"
								value={institucion}
								onChange={onChange}
							/>						
						</Form.Item>
						<Form.Item className='ant-form-item'>
							<Input
								name="pin"		
								prefix={<KeyOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
								type="text"
								placeholder="PIN de acceseso"
								className="register-form__input"
								value={pin}
								onChange={onChange}
							/>						
						</Form.Item>
						<Form.Item className='ant-form-item'>
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
						<Form.Item className='ant-form-item'>
							<Input
								prefix={<LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
								type="password"
								name="repeatPassword"
								placeholder="Repetir contraseña"
								className="register-form__input"
								value={repeatPassword}
								onChange={onChange}
							/>
						</Form.Item>
						<Form.Item>
							<Checkbox
								name="privacyPolicy"
								onChange={onChange}
								checked={privacyPolicy}
								>
								He leído y acepto la <a>política de privacidad.</a>
							</Checkbox>
						</Form.Item>
						<Form.Item>		 
							<Button type="primary" htmlType="submit" className="login-form-button">
								Crear cuenta
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>			
	)
}

export default Register;