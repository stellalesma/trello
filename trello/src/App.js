import { ListProvider } from './utils/ListContext';
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
	return (
		<div>
			<Header />
			<ListProvider>
				<Home />
			</ListProvider>
		</div>
	);
}

export default App;
