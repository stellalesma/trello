import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ListProvider } from "./utils/ListContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/PasswordReset";

function App() {
	const [token, setToken] = useState<string>("");

	return (
		<div className="h-screen">
			<ListProvider>
				<Routes>
					<Route path="/login" element={<Login setToken={setToken} />} />
					<Route path="/register" element={<Register setToken={setToken} />} />
					<Route path="/password-reset" element={<PasswordReset />} />
					<Route path="/" element={<Home token={token} />} />
				</Routes>
			</ListProvider>
		</div>
	);
}

export default App;
