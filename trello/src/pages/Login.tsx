import React, { ChangeEvent, FormEvent, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate } from "react-router-dom";
import { FaTrello } from "react-icons/fa";

import axios, { AxiosError } from "axios";

import { useAccessToken } from "../utils/AccessTokenContext";

function Login() {
	const navigate = useNavigate();
	const { addToast } = useToasts();
	const { updateToken } = useAccessToken();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	  
		if (email.trim() && password.trim()) {
			const user = {
				email: email,
				password: password,
		    };
	  
			try {
				const response = await axios.post("http://localhost:8081/user/login", user);
				addToast("Login successful!", { appearance: "success", autoDismiss: true });
				updateToken(response.data.access_token);
				navigate("/home");
			} catch (error) {
				if (error instanceof AxiosError) {
					if (error.response?.status === 401) {
						addToast(error.response.data.detail, { appearance: "error", autoDismiss: false });
					} else
						console.error("Error logging in:", error);
				} else {
					console.error("Error logging in:", error);
				}
			}

		}
	};

	return (
		<div className="flex flex-col w-[65vw] md:w-[50vw] lg:w-[40vw] fixed left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4">
			<p className="flex justify-center mb-15 font-bold text-4xl sm:text-5xl font-serif">Welcome !</p>

			<div className="p-5 md:p-7 lg:p-10 bg-white/90">
				<p className='flex items-center justify-center text-3xl sm:text-4xl mb-5 opacity-60'>
					<FaTrello className="mr-1.5" />
					Trello
				</p>

				<p className="flex justify-center mb-2.5">Log in to continue</p>
				<form id="form-description" className="flex flex-col" onSubmit={handleSubmit}>
					<input id="form-email" name="for-email" className="p-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter your email..." type="email" value={email} onChange={handleEmail}></input>
					<input id="form-password" name="for-password" className="p-2.5 mt-2 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter your password..." type="password" value={password} onChange={handlePassword}></input>
					<button className="w-full h-10 mt-3.5 font-bold text-base text-white bg-cyan-400 hover:bg-cyan-300" type="submit">Log in</button>
				</form>

				<div className="flex justify-center mt-7 text-[13px] sm:text-base">
					<Link to="/password-reset" className=" text-blue-800 hover:underline">Can&apos;t log in?</Link>
					<span className="cursor-default font-bold">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
					<Link to="/register" className=" text-blue-800 hover:underline">Create an account</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
