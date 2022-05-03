const SET_USER = "SET_USER"
const SET_LOADING = "SET_LOADING"
const LOGOUT = "LOGOUT"

const defaultState = {
	currentUser: {},
	isAuth: false,
	isLoading: false
}

export default function userReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_USER:
			console.log('user response: ', action.payload);
			return {
				...state,
				currentUser: action.payload,
				isAuth: true
			}
		case SET_LOADING:
			return {
				...state,
				isLoading: action.payload
			}
		case LOGOUT:
			localStorage.removeItem("token")
			return {
				...state,
				currentUser: {},
				isAuth: false
			}
		default:
			return state
	}
}

export const setUser = user => ({ type: SET_USER, payload: user })
export const setLoading = loading => ({ type: SET_LOADING, payload: loading })
export const logout = () => ({ type: LOGOUT })