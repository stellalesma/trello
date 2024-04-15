import React, { ChangeEvent, FormEvent, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate } from "react-router-dom";
import { FaTrello } from "react-icons/fa";

import axios, { AxiosError } from "axios";

import { useAccessToken } from "../utils/AccessTokenContext";

function PasswordReset() {
	const navigate = useNavigate();
	const { addToast } = useToasts();
	const { updateToken } = useAccessToken();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [enteredCode, setEnteredCode] = useState<string>("");
	const [canEnterCode, setCanEnterCode] = useState<boolean>(false);

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleEnteredCode = (e: ChangeEvent<HTMLInputElement>) => {
		setEnteredCode(e.target.value);
	};

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleResetSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email) {
			await axios.put("http://localhost:8081/user/reset-password", {email: email})
				.then(response => {
					setCanEnterCode(true);
					console.log("The OTP code is:", response.data.otp);
				})
				.catch(error => {
					if (error instanceof AxiosError) {
						if (error.response?.status === 404) {
							addToast(error.response.data.detail, { appearance: "error", autoDismiss: false });
						} else
							console.error("Cannot get the code to reset password:", error);
					} else
						console.error("Cannot get the code to reset password:", error);
				});
		}
	};

	const handleNewSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	
		try {
			if (email && enteredCode && password) {
				const response = await axios.put("http://localhost:8081/user/new-password", { email: email, password: password, otp: enteredCode });
				addToast(response.data.message, { appearance: "success", autoDismiss: true });

				const answer = await axios.post("http://localhost:8081/user/login", { email: email, password: password });
				addToast("Login successful!", { appearance: "success", autoDismiss: true });
				updateToken(answer.data.access_token);
				navigate("/home");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 400) {
					addToast(error.response.data.detail, { appearance: "error", autoDismiss: false });
				} else
					console.error("Error resetting password:", error);
			} else
				console.error("Error resetting password:", error);
		}
	};	

	return (
		<div className="flex flex-col w-[65vw] md:w-[50vw] lg:w-[40vw] fixed left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4">
			{ canEnterCode ? (
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
			) : (
				<div>
					<p className="flex justify-center mb-15 font-bold text-4xl sm:text-5xl font-serif">Welcome !</p>

					<div className="p-5 md:p-7 lg:p-10 bg-white/90">
						<p className='flex items-center justify-center text-3xl sm:text-4xl mb-5 opacity-60'>
							<FaTrello className="mr-1.5" />
							Trello
						</p>
		
						<p className="flex justify-center mb-5">Can&apos;t log in?</p>

						<p className="text-xs font-bold ml-1">We&apos;ll send you a recovery code, please</p>
						<form id="form-description" className="flex flex-col" onSubmit={handleResetSubmit}>
							<input id="form-email" name="form-email" className="p-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter your email..." type="email" value={email} onChange={handleEmail}></input>
							<button className="w-full h-10 mt-3.5 font-bold text-base text-white bg-cyan-400 hover:bg-cyan-300" type="submit">Send recovery code</button>
						</form>

						<div className="flex justify-center mt-7 text-[13px] sm:text-base">
							<Link to="/login" className=" text-blue-800 hover:underline">Return to log in</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default PasswordReset;
