import React, { useEffect } from "react"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import { adminRoutes, publicRoutes } from "../router"
import { privateRoutes } from "../router"
import { Navbar } from "./Navbar"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "../actions/user"
import { Loader } from "./Loader"
import { createBrowserHistory } from "history"

export const AppRouter = () => {
	const { currentUser, isAuth, isLoading } = useSelector(state => state.user)
	const dispatch = useDispatch()
	const history = createBrowserHistory()

	history.listen(_ => {
		window.scrollTo(0, 0)
	})

	useEffect(() => {
		dispatch(auth())
	}, [])

	return (
		<div className="wrapper">
			{isLoading ? (
				<Loader />
			) : (
				<Router history={history}>
					<Navbar />
					<Routes>
						{currentUser?.role === "admin" ?
							adminRoutes.map(route => <Route key={route.path} exact={route.exact} path={route.path} element={route.element} />) :
							isAuth ? privateRoutes.map(route => <Route key={route.path} exact={route.exact} path={route.path} element={route.element} />) :
								publicRoutes.map(route => <Route key={route.path} exact={route.exact} path={route.path} element={route.element} />)
						}
					</Routes>
				</Router>
			)}
		</div>
	)
}