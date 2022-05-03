import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import EyeIcon from "../static/images/eye-icon.svg"
import EyeOffIcon from "../static/images/eye-off-icon.svg"
import { useDispatch } from "react-redux"
import { login } from "../actions/user"

const schema = yup.object().shape({
	email: yup.string().email('Неверная почта').required('Почта обязательная'),
	password: yup.string().required('Введите пароль').min(6, 'Короткий пароль')
})

export const Login = () => {
	const dispatch = useDispatch()
	const [isPassword, setIsPassword] = useState(true)
	const { register, formState: { errors }, handleSubmit } = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema)
	})

	return (
		<form className="form__body" onSubmit={handleSubmit(data => login(dispatch, data.email, data.password))}>
			<input
				className={errors.email ? "form__input error input" : "form__input input"}
				placeholder="Email"
				name="email"
				error={errors.email}
				{...register('email')}
			/>
			<div className="form__password">
				<input
					className={errors.password ? "form__input error input" : "form__input input"}
					placeholder="Пароль"
					name="password"
					type={isPassword ? "password" : "text"}
					{...register('password')}
				/>
				<img
					src={isPassword ? EyeIcon : EyeOffIcon}
					alt="показать пароль"
					onClick={() => setIsPassword(prev => prev === true ? false : true)}
				/>
			</div>
			<button className="form__button button" type="submit">
				войти
			</button>
		</form>
	)
}