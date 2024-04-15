import React, { ChangeEvent, FormEvent, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useAccessToken } from "../utils/AccessTokenContext";

type ResetPasswordFormProps = {
    email: string,
    setCanEnterCode: (state: boolean) => void,
};

export default function ResetPasswordForm({ email, setCanEnterCode } : ResetPasswordFormProps) {
	const navigate = useNavigate();
	const { updateToken } = useAccessToken();
	const [password, setPassword] = useState<string>("");
	const [enteredCode, setEnteredCode] = useState<string>("");

	const handleEnteredCode = (e: ChangeEvent<HTMLInputElement>) => {
		setEnteredCode(e.target.value);
	};

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleNewSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	
		try {
			if (email && enteredCode && password) {
				const response = await axios.put("http://localhost:8081/user/new-password", { email: email, password: password, otp: enteredCode });
				console.log(response.data.message);

				const answer = await axios.post("http://localhost:8081/user/login", { email: email, password: password });
				console.log("Login successful:", email);
				updateToken(answer.data.access_token);
				navigate("/home");
			}
		} catch (error) {
			console.error("Error resetting password:", error);
		}
	};

	return (
		<div className="p-5 md:p-7 lg:p-10 bg-white/90">
			<div className="grid grid-cols-[1fr_12fr] items-center mb-7">
				<IoChevronBackOutline className="hover:text-blue-800" onClick={() => setCanEnterCode(false)} />
				<p className='flex justify-center text-2xl sm:text-3xl opacity-60'>Reset Password</p>
			</div>

			<form id="form-description" className="flex flex-col" onSubmit={handleNewSubmit}>
				<label htmlFor="reset-code" className="text-xs font-bold ml-1">You received a code :</label>
				<input id="reset-code" name="reset-code" className="p-2.5 mb-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter the code..." type="text" value={enteredCode} onChange={handleEnteredCode}></input>
				<label htmlFor="reset-password" className="text-xs font-bold ml-1">Set your new password :</label>
				<input id="reset-password" name="reset-password" className="p-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter new password..." type="password" value={password} onChange={handlePassword}></input>

				<button className="w-full h-10 mt-3.5 font-bold text-base text-white bg-cyan-400 hover:bg-cyan-300" type="submit">Submit</button>
			</form>
		</div>
	);
}
