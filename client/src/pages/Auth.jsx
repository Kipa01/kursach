import React, { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import { Login } from "../components/Login"
import { Registration } from "../components/Registration"

export const Auth = () => {
	const location = useLocation()
	const [isLoginPage, setIsLoginPage] = useState(location.pathname === "/login")

	const changePage = (page) => {
		window.history.pushState('Object', 'Title', page);
		setIsLoginPage(page === "/login" ? true : false)
	}

	return (
		<div className="container">
			<div className="form">
				<div className="form__header">
					<div className={isLoginPage ? "form__title active" : "form__title"} onClick={() => changePage("/login")}>Войти</div>
					<div className={isLoginPage ? "form__title" : "form__title active"} onClick={() => changePage("/register")}>Зарегистрироваться</div>
				</div>
				{isLoginPage ? <Login /> : <Registration />}
			</div>

		</div>
	)
}