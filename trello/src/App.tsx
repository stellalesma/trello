import React from "react";
import { Routes, Route } from "react-router-dom";

import { ListProvider } from "./utils/ListContext";
import { AccessTokenProvider } from "./utils/AccessTokenContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/PasswordReset";

function App() {
	return (
		<div className="h-screen">
			<AccessTokenProvider>
				<ListProvider>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/password-reset" element={<PasswordReset />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</ListProvider>
			</AccessTokenProvider>
		</div>
	);
}

export default App;
