import axios from "axios"
import { setArts, addArts, deleteArts } from "../reducers/artReducer"
import { setLoading } from "../reducers/userReducer"
import { notifyUser, notifyUserError } from "../helpers/Pnotify"

export const getArts = () => {
	return async dispatch => {
		try {
			const response = await axios.get("http://localhost:5000/api/arts",
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			)
			dispatch(setArts(response.data))
		} catch (e) { notifyUserError(e.response.data.message) }
	}
}

export const addArt = async (dispatch, name, author, desc, file) => {
	try {
		dispatch(setLoading(true))
		const formData = new FormData()
		formData.append("name", name)
		formData.append("author", author)
		formData.append("desc", desc)
		formData.append("file", file[0])

		const response = await axios.post("http://localhost:5000/api/arts/upload", formData,
			{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
		)
		dispatch(addArts(response.data.art))
		notifyUser(response.data.message)
	} catch (e) { notifyUserError(e.response.data.message) } finally { dispatch(setLoading(false)) }
}

export const deleteArt = async (dispatch, _id) => {
	try {
		dispatch(setLoading(true))
		const response = await axios.delete(`http://localhost:5000/api/arts?id=${_id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		dispatch(deleteArts(_id))
		notifyUser(response.data.message)
	} catch (e) { notifyUserError(e.response.data.message) } finally { dispatch(setLoading(false)) }
}