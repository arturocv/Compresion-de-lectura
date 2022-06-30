import React from 'react';
import {Link} from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined,  LockOutlined, 
		MailOutlined, EnvironmentOutlined, 
		KeyOutlined, } from '@ant-design/icons';
import AnimacionLogo from '../../Animations/logo/AnimacionLogo';
import ImgRegister from '../../images/logoInicioSesion.png';
import Alerta from '../Alertas/Alert';

const Login = () => {
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
					<Form className="register-form">					
						<Form.Item className='ant-form-item-login'>
							<Input
								name="email"		
								prefix={<MailOutlined type="email" style={{ color: "rgba(0,0,0,.25)" }} />}
								type="email"
								placeholder="Correo electronico"
								className="register-form__input"
							/>
						</Form.Item>					
						<Form.Item className='ant-form-item-login'>
							<Input
								prefix={<LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
								type="password"
								name="password"
								placeholder="Contraseña"
								className="register-form__input"
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