import React, { ChangeEvent, FormEvent } from "react";
import { FaTrello } from "react-icons/fa";
import { Link } from "react-router-dom";

import axios from "axios";

type RecoveryCodeFormProps = {
    email: string,
    setEmail: (data: string) => void,
    setCanEnterCode: (state: boolean) => void,
};

function RecoveryCodeForm({ email, setEmail, setCanEnterCode } : RecoveryCodeFormProps) {

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleResetSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email) {
			await axios.put("http://localhost:8081/user/reset-password", {email: email})
				.then(response => {
					setCanEnterCode(true);
					console.log("The OTP code is:", response.data.otp);
				})
				.catch(error => console.error("Cannot get the code to reset password:", error));
		}
	};

	return (
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
	);
}

export default RecoveryCodeForm;
