import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrello } from "react-icons/fa";

function PasswordReset() {
	const [email, setEmail] = useState<string>("");

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email.trim()) {
			console.log("email:", email);
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

				<p className="flex justify-center mb-2.5">Can&apos;t log in?</p>
	
				<p className="text-xs font-bold ml-1">We&apos;ll send a recovery link to</p>
				<form id="form-description" className="flex flex-col" onSubmit={handleSubmit}>
					<input id="form-email" name="form-email" className="p-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter an email..." type="email" value={email} onChange={handleEmail}></input>
					<button className="w-full h-10 mt-3.5 font-bold text-base text-white bg-cyan-400 hover:bg-cyan-300" type="submit">Send recovery link</button>
				</form>

				<div className="flex justify-center mt-7 text-[13px] sm:text-base">
					<Link to="/login" className=" text-blue-800 hover:underline">Return to log in</Link>
				</div>
			</div>
		</div>
	);
}

export default PasswordReset;
