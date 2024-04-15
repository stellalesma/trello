import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

import axios, { AxiosError } from "axios";

import { useAccessToken } from "../utils/AccessTokenContext";

// je n'arrive pas a rendre la page scrollable...

function Settings() {
	const navigate = useNavigate();
	const { config } = useAccessToken();

	const [newName, setNewName] = useState<string>("");
	const [newEmail, setNewEmail] = useState<string>("");
	const [userEmail, setUserEmail] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");

	const handleNewName = (e: ChangeEvent<HTMLInputElement>) => {
		setNewName(e.target.value);
	};

	const handleNewEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setNewEmail(e.target.value);
	};

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setUserEmail(e.target.value);
	};

	const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};

	const handleUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data: {name?: string, email?: string} = {};

		if (newName) data.name = newName;
		if (newEmail) data.email = newEmail;

		await axios.patch("http://localhost:8081/user/update", data, config)
			.then((response) => {
				setNewName("");
				setNewEmail("");
				console.log("User updating:", response.data.message);
			})
			.catch((error) => {
				if (error instanceof AxiosError) {
					if (error.response?.status === 400)
						console.error(error.response.data.detail);
					else
						console.error("Cannot update user informations - name and email:", error);
				} else
					console.error("Cannot update user informations - name and email:", error);	
			});
	};

	const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await axios.put("http://localhost:8081/user/update/password", { email: userEmail, password: newPassword }, config)
			.then((response) => {
				setUserEmail("");
				setNewPassword("");
				console.log("Password updating:", response.data.message);
			})
			.catch((error) => {
				if (error instanceof AxiosError) {
					if (error.response?.status === 404)
						console.error(error.response.data.detail);
					else
						console.error("Cannot update password:", error);
				} else
					console.error("Cannot update password:", error);
			});
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex flex-col w-[80vw] md:w-[70vw] fixed left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4">
				<div className="grid grid-cols-[1fr_8fr] mb-[6vh] md:mb-8">
					<div className="flex items-center cursor-pointer text-xs lg:text-base hover:opacity-70" onClick={() => navigate("/home")}>
						<IoChevronBackOutline />
						<p className="font-bold font-serif">back</p>
					</div>
					<p className="flex justify-center font-bold text-2xl lg:text-4xl font-serif">Account Settings</p>
				</div>

				<div className="p-5 md:py-7 lg:p-10 bg-white/90">

					<p className="font-bold text-base lg:text-lg mb-5 lg:mb-6">Update your credentials ?</p>
					<form onSubmit={handleUserSubmit} className="flex flex-col md:items-center">
						<div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-x-8 lg:gap-x-12 md:items-center mb-2 lg:mb-3">
							<label className="flex justify-start md:justify-end md:font-medium indent-2.5 text-sm lg:text-base" htmlFor="for-new-name">New Name</label>
							<input id="for-new-name" name="for-new-name" type="text" value={newName} onChange={handleNewName} className="grow p-2.5 md:w-80 lg:w-96 h-10 rounded outline-stone-300/70 focus:outline-cyan-400 border bg-white"></input>
						</div>

						<div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-x-8 lg:gap-x-12 md:items-center mb-2 lg:mb-3">
							<label className="flex justify-start md:justify-end md:font-medium indent-2.5 text-sm lg:text-base" htmlFor="for-new-email">New Email</label>
							<input id="for-new-email" name="for-new-email" type="email" value={newEmail} onChange={handleNewEmail} className="grow p-2.5 md:w-80 lg:w-96 h-10 rounded outline-stone-300/70 focus:outline-cyan-400 border bg-white"></input>
						</div>

						{ newName || newEmail ? (
							<div className="flex justify-center mt-4 lg:mt-5">
								<button type="submit" className="font-medium lg:font-normal text-white bg-cyan-400 w-32 md:w-52 lg:text-base hover:opacity-80">Save Changes</button>
							</div>
						) : null }
					</form>

					<p className="font-bold text-base lg:text-lg mb-5 lg:mb-6 mt-5 lg:mt-6">Change your password ?</p>
					<form onSubmit={handlePasswordSubmit} className="flex flex-col md:items-center">
						<div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-x-8 lg:gap-x-12 md:items-center mb-2 lg:mb-3">
							<label className="flex justify-start md:justify-end md:font-medium indent-2.5 text-sm lg:text-base" htmlFor="for-email">Email</label>
							<input id="for-email" name="for-email" type="email" value={userEmail} onChange={handleEmail} className="grow p-2.5 md:w-80 lg:w-96 h-10 rounded outline-stone-300/70 focus:outline-cyan-400 border bg-white"></input>
						</div>

						<div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-x-8 lg:gap-x-12 md:items-center mb-2 lg:mb-3">
							<label className="flex justify-start md:justify-end md:font-medium indent-2.5 text-sm lg:text-base" htmlFor="for-n_password">New password</label>
							<input id="for-n_password" name="for-n_password" type="password" value={newPassword} onChange={handleNewPassword} className="grow p-2.5 md:w-80 lg:w-96 h-10 rounded border outline-stone-300/70 focus:outline-cyan-400 bg-white"></input>
						</div>

						{ userEmail && newPassword ? (
							<div className="flex justify-center mt-4 lg:mt-5">
								<button type="submit" className="font-medium lg:font-normal text-white bg-cyan-400 w-32 md:w-52 lg:text-base hover:opacity-80">Save Changes</button>
							</div>
						) : null }
					</form>

				</div>
			</div>
		</div>
	);
}

export default Settings;
