const SET_ARTS = "SET_ARTS"
const ADD_ART = "ADD_ART"
const DELETE_ART = "DELETE_ART"

const defaultState = {
	arts: []
}

export default function artReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_ARTS:
			return { ...state, arts: action.payload }
		case ADD_ART:
			return { ...state, arts: [...state.arts, action.payload] }
		case DELETE_ART:
			return { ...state, arts: [...state.arts.filter(item => item._id !== action.payload)] }
		default:
			return state
	}
}

export const setArts = (arts) => ({ type: SET_ARTS, payload: arts })
export const addArts = (art) => ({ type: ADD_ART, payload: art })
export const deleteArts = (artId) => ({ type: DELETE_ART, payload: artId })