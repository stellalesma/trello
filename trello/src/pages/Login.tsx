import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrello } from "react-icons/fa";

import axios from "axios";

import { User } from "types/Types";
import { useAccessToken } from "../utils/AccessTokenContext";

function Login() {
	const navigate = useNavigate();
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
				const response = await axios.get("http://localhost:8081/users");
				const users = response.data.data;
	
				const foundUser = users.find((userItem: User) => {
			  		return userItem.email === user.email && userItem.password === user.password;
				});
	  
				if (foundUser) {
					const response2 = await axios.post("http://localhost:8081/user/login", user);
					console.log("Login successful:", user.email);
					updateToken(response2.data.access_token);
					navigate("/");
				} else {
					console.error("No user found with the provided credentials.");
				}
		  	} catch (error) {
				console.error("Error logging in:", error);
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

				<label htmlFor="form-description" className="flex justify-center mb-2.5">Log in to continue</label>
				<form id="form-description" className="flex flex-col" onSubmit={handleSubmit}>
					<input className="p-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter your email..." type="email" value={email} onChange={handleEmail}></input>
					<input className="p-2.5 mt-2 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter your password..." type="password" value={password} onChange={handlePassword}></input>
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
