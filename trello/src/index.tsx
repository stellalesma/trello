import "./input.css";

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<BrowserRouter>
				<ToastProvider>
					<App />
				</ToastProvider>
			</BrowserRouter>
		</StrictMode>
	);
} else {
  	throw new Error("Root element not found in the DOM.");
}
