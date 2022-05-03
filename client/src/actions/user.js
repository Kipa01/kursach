import axios from "axios"
import { setLoading, setUser } from "../reducers/userReducer"
import { notifyUser, notifyUserError } from "../helpers/Pnotify"

export const registration = async (email, password) => {
	try {
		const response = await axios.post("http://localhost:5000/api/auth/registration", {
			email,
			password
		})
		notifyUser(response.data.message)
	} catch (e) { notifyUserError(e.response.data.message) }

}

export const login = async (dispatch, email, password) => {
	try {
		const response = await axios.post("http://localhost:5000/api/auth/login", {
			email,
			password
		})
		dispatch(setUser(response.data.user))
		localStorage.setItem("token", response.data.token)
		notifyUser(response.data.message)
	} catch (e) { notifyUserError(e.response.data.message) }
}

export const auth = () => {
	return async dispatch => {
		try {
			dispatch(setLoading(true))
			const response = await axios.get("http://localhost:5000/api/auth/auth",
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			)
			dispatch(setUser(response.data.user))
		} catch (e) { localStorage.removeItem("token") } finally { dispatch(setLoading(false)) }
	}
}

export const addArt = (_id, filePath) => {
	return async dispatch => {
		try {
			dispatch(setLoading(true))
			const response = await axios.post("http://localhost:5000/api/user/add", { _id, filePath },
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			)
			dispatch(setUser(response.data.user))
			notifyUser(response.data.message)
		} catch (e) { notifyUserError(e.response.data.message) } finally { dispatch(setLoading(false)) }
	}
}

export const delArt = (_id, filePath) => {
	return async dispatch => {
		try {
			dispatch(setLoading(true))
			const response = await axios.post("http://localhost:5000/api/user/del", { _id, filePath },
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			)
			dispatch(setUser(response.data.user))
			notifyUser(response.data.message)
		} catch (e) { notifyUserError(e.response.data.message) } finally { dispatch(setLoading(false)) }
	}
}