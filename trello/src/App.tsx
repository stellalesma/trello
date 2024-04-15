import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { ListProvider } from "./utils/ListContext";
import AxiosInterpretor from "./services/AxiosInterceptor";
import { AccessTokenProvider } from "./utils/AccessTokenContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import PasswordReset from "./pages/PasswordReset";

function App() {
	const navigate = useNavigate();
	const { addToast } = useToasts();

	useEffect(() => {
		AxiosInterpretor({ addToast, navigate });
	}, []);

	return (
		<div className="h-screen">
			<AccessTokenProvider>
				<ListProvider>
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/password-reset" element={<PasswordReset />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="*" element={<Navigate to="/home" />} />
					</Routes>
				</ListProvider>
			</AccessTokenProvider>
		</div>
	);
}

export default App;
