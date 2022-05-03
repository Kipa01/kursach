import "./App.scss"
import { Provider } from "react-redux"
import { AppRouter } from "./components/AppRouter"
import { store } from "./store"

function App() {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
}

export default App
