import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined as Icon,  LockOutlined as Look, UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  emailValidation,
  minLengthValidation
} from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";

import "./RegisterForm.scss";

const RegisterForm = () => {

	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		repeatPassword: "",
		privacyPolicy: false
	});

	const [formValid, setFormValid] = useState({
		email: false,
		password: false,
		repeatPassword: false,
		privacyPolicy: false
	});

	const changeForm = e => {
		if (e.target.name === "privacyPolicy") {
		setInputs({
			...inputs,
			[e.target.name]: e.target.checked
		});
		} else {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		});
		}
	};

	const inputValidation = e => {		
		const { type, name } = e.target;

		if (type === "email") {
		  setFormValid({ ...formValid, [name]: emailValidation(e.target) });
		}
		if (type === "password") {
		  setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
		}
		if (type === "checkbox") {
		  setFormValid({ ...formValid, [name]: e.target.checked });
		}
	};

	const register = (e) => {
		const emailVal = inputs.email;
		const passwordVal = inputs.password;
		const repeatPasswordVal = inputs.repeatPassword;
		const privacyPolicyVal = inputs.privacyPolicy;

		if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
		  	notification["error"]({
		    message: "Todos los campos son obligatorios"
		});
		} else {
			if (passwordVal !== repeatPasswordVal) {
				notification["error"]({
				message: "Las contraseñas tienen que ser iguales."
				});
			} else {
				signUpApi({
					nombre: "King",
					email: "asdasdasdds@gmail.com",
					password: "123456"
				});
				// const result = await signUpApi(inputs);
				// if (!result.ok) {
				// 	notification["error"]({
				// 	message: result.message
				// });
				// } else {
				// 	notification["success"]({
				// 	message: result.message
				// });
				// resetForm();
				// }
			}
		}
	};

	return (
	
		<Form className="register-form" onChange={changeForm} autoComplete="off" onFinish={register}>
		<Form.Item
		>
			<Input
			name="email"		
			prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
			type="email"
			placeholder="Correo electronico"
			className="register-form__input"
			onChange={inputValidation}
			value={inputs.email}
			/>
		</Form.Item>
		<Form.Item>
			<Input
			prefix={<Look type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
			type="password"
			name="password"
			placeholder="Contraseña"
			className="register-form__input"
			onChange={inputValidation}
			value={inputs.password}
			/>
		</Form.Item>
		<Form.Item>
			<Input
			prefix={<Look type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
			type="password"
			name="repeatPassword"
			placeholder="Repetir contraseña"
			className="register-form__input"
			onChange={inputValidation}
			value={inputs.repeatPassword}
			/>
		</Form.Item>
		<Form.Item>
			<Checkbox
			name="privacyPolicy"
			onChange={inputValidation}
			checked={inputs.privacyPolicy}
			>
			He leído y acepto la política de privacidad.
			</Checkbox>
		</Form.Item>
		<Form.Item>		 
			<Button htmlType="submit" className="register-form__button">
			Crear cuenta
			</Button>
		</Form.Item>
		</Form>
	);
}


export default () => <RegisterForm />; 