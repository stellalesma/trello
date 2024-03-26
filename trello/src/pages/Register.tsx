import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrello } from "react-icons/fa";

import axios from "axios";

import { User } from "../types/Types";
import { useAccessToken } from "../utils/AccessTokenContext";

function Register() {
	const navigate = useNavigate();
	const { updateToken } = useAccessToken();

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handlename = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email.trim() && password.trim() && name.trim()) {
			const newUser: User = {
				name: name,
				email: email,
				password: password,
			};

			await axios.post("http://localhost:8081/user/signup", newUser)
				.then((response) => {
					console.log(`New user added: ${newUser.name} (${newUser.email})`);
					updateToken(response.data.access_token);
					navigate("/");
				})
				.catch((error) => console.error("Error adding new user:", error));
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

				<label htmlFor="form-description" className="flex justify-center mb-2.5">Sign up to continue</label>
				<form id="form-description" className="flex flex-col" onSubmit={handleSubmit}>
					<input className="p-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter your name..." type="text" value={name} onChange={handlename}></input>
					<input className="p-2.5 mt-2 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter your email..." type="email" value={email} onChange={handleEmail}></input>
					<input className="p-2.5 mt-2 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter your password..." type="password" value={password} onChange={handlePassword}></input>
					<button className="w-full h-10 mt-3.5 font-bold text-base text-white bg-cyan-400 hover:bg-cyan-300" type="submit">Sign up</button>
				</form>

				<div className="flex justify-center mt-7 text-[13px] sm:text-base">
					<p className="cursor-default">Already have an account?&nbsp;</p>
					<Link to="/login" className=" text-blue-800 hover:underline">Log in</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
