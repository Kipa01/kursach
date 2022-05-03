import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/userReducer"
import { useLocation } from "react-router-dom"
import { notifyUser } from "../helpers/Pnotify"

export const Navbar = () => {
	const { currentUser, isAuth } = useSelector(state => state.user)
	const dispatch = useDispatch()
	const location = useLocation()
	const handleLogout = () => {
		dispatch(logout())
		notifyUser("Вы вышли из аккаунта")
	}
	return (
		<div className="navbar">
			<div className="container">
				<div className="navbar__body">
					<div className="navbar__title">
						Kipa Gallery
					</div>
					{isAuth &&
						<div className="navbar__buttons">
							<button className="navbar__button" onClick={() => handleLogout()}>выйти</button>
							{currentUser?.role === "admin" ?
								<NavLink className="navbar__button"
									to={location.pathname === "/admin" ? "/" : "/admin"}>
									{location.pathname === "/admin" ? "главная" : "админка"}
								</NavLink> :
								<NavLink className="navbar__button"
									to={location.pathname === "/favorites" ? "/" : "/favorites"}>
									{location.pathname === "/favorites" ? "главная" : "избранное"}
								</NavLink>
							}
						</div>
					}
				</div>
			</div>
		</div>
	)
}