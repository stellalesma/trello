import React from "react";

import { ListProvider } from "./utils/ListContext";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<ListProvider>
				<Home />
			</ListProvider>
		</div>
	);
}

export default App;
