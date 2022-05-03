import { Navigate } from 'react-router'
import { Admin } from '../pages/Admin'
import { Auth } from "../pages/Auth"
import { Main } from "../pages/Main"
import { ArtPage } from '../pages/ArtPage'
import { Favorites } from '../pages/Favorites'

export const routeNames = {
	LOGIN: { path: '/login', name: 'Логин' },
	REGISTRATION: { path: '/register', name: 'Регистрация' },
	MAIN: { path: '/', name: 'Главная' },
	ADMIN: { path: '/admin', name: 'Админ панель' },
	FAVORITES: { path: '/favorites', name: 'Избранное' },
	ART_PAGE: { path: '/arts/:id', name: 'Страница картины' },
}

export const adminRoutes = [
	{
		path: routeNames.ADMIN.path,
		exact: true,
		element: <Admin />
	},
	{
		path: routeNames.MAIN.path,
		exact: true,
		element: <Main />
	},
	{
		path: routeNames.ART_PAGE.path,
		exact: true,
		element: <ArtPage />
	},
	{
		path: '*',
		exact: false,
		element: <Navigate to="/" />
	}
]

export const privateRoutes = [
	{
		path: routeNames.MAIN.path,
		exact: true,
		element: <Main />
	},
	{
		path: routeNames.ART_PAGE.path,
		exact: true,
		element: <ArtPage />
	},
	{
		path: routeNames.FAVORITES.path,
		exact: true,
		element: <Favorites />
	},
	{
		path: '*',
		exact: false,
		element: <Navigate to="/" />
	}
]

export const publicRoutes = [
	{
		path: routeNames.LOGIN.path,
		exact: true,
		element: <Auth />
	},
	{
		path: routeNames.REGISTRATION.path,
		exact: true,
		element: <Auth />
	},
	{
		path: '*',
		exact: false,
		element: <Navigate to="/login" />
	}
]