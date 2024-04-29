import React from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { IoChevronBackOutline } from "react-icons/io5";

import axios, { AxiosError } from "axios";
import { Formik, Form, Field, FormikHelpers } from "formik";

import { useAccessToken } from "../utils/AccessTokenContext";

// je n'arrive pas a rendre la page scrollable sur la verticale...

type UserValues = {
	newName: string,
	newEmail: string,
};

type PasswordValues = {
	userEmail: string,
	newPassword: string,
};

function Settings() {
	const navigate = useNavigate();
	const { addToast } = useToasts();
	const { config } = useAccessToken();

	const handleUserSubmit = async (values: UserValues, { setSubmitting, resetForm }: FormikHelpers<UserValues>) => {
		const data: {name?: string, email?: string} = {};

		if (values.newName) data.name = values.newName;
		if (values.newEmail) data.email = values.newEmail;

		await axios.patch("http://localhost:8081/user/update", data, config)
			.then((response) => {
				resetForm();
				setSubmitting(false);
				addToast(response.data.message, { appearance: "success", autoDismiss: true });
			})
			.catch((error) => {
				if (error instanceof AxiosError) {
					if (error.response?.status === 400) addToast(error.response.data.detail, { appearance: "error", autoDismiss: false });
					else console.error("Cannot update user informations - name and email:", error);
				} else
					console.error("Cannot update user informations - name and email:", error);	
			});
	};

	const handlePasswordSubmit = async (values: PasswordValues, { setSubmitting, resetForm }: FormikHelpers<PasswordValues>) => {
		await axios.put("http://localhost:8081/user/update/password", { email: values.userEmail, password: values.newPassword }, config)
			.then((response) => {
				resetForm();
				setSubmitting(false);
				addToast(response.data.message, { appearance: "success", autoDismiss: true });
			})
			.catch((error) => {
				if (error instanceof AxiosError) {
					if (error.response?.status === 404)
						addToast(error.response.data.detail, { appearance: "error", autoDismiss: false });
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
					<Formik initialValues={{ newName: "", newEmail: "" }} onSubmit={handleUserSubmit}>
						{({ values, isSubmitting }) => (
							<Form className="flex flex-col md:items-center">
								<div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-x-8 lg:gap-x-12 md:items-center mb-2 lg:mb-3">
									<label className="flex justify-start md:justify-end md:font-medium indent-2.5 text-sm lg:text-base" htmlFor="for-new-name">New Name</label>
									<Field id="for-new-name" name="newName" type="text" className="grow p-2.5 md:w-80 lg:w-96 h-10 rounded outline-stone-300/70 focus:outline-cyan-400 border bg-white" />
								</div>

								<div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-x-8 lg:gap-x-12 md:items-center mb-2 lg:mb-3">
									<label className="flex justify-start md:justify-end md:font-medium indent-2.5 text-sm lg:text-base" htmlFor="for-new-email">New Email</label>
									<Field id="for-new-email" name="newEmail" type="email" className="grow p-2.5 md:w-80 lg:w-96 h-10 rounded outline-stone-300/70 focus:outline-cyan-400 border bg-white" />
								</div>

								{ values.newName || values.newEmail ? (
									<div className="flex justify-center mt-4 lg:mt-5">
										<button type="submit" className="font-medium lg:font-normal text-white bg-cyan-400 w-32 md:w-52 lg:text-base hover:opacity-80" disabled={isSubmitting}>Save Changes</button>
									</div>
								) : null }
							</Form>
						)}
					</Formik>

					<p className="font-bold text-base lg:text-lg mb-5 lg:mb-6 mt-5 lg:mt-6">Change your password ?</p>
					<Formik initialValues={{ userEmail: "", newPassword: "" }} onSubmit={handlePasswordSubmit}>
						{({ values, isSubmitting }) => (
							<Form className="flex flex-col md:items-center">
								<div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-x-8 lg:gap-x-12 md:items-center mb-2 lg:mb-3">
									<label className="flex justify-start md:justify-end md:font-medium indent-2.5 text-sm lg:text-base" htmlFor="for-email">Email</label>
									<Field id="for-email" name="userEmail" type="email" className="grow p-2.5 md:w-80 lg:w-96 h-10 rounded outline-stone-300/70 focus:outline-cyan-400 border bg-white" />
								</div>

								<div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] md:gap-x-8 lg:gap-x-12 md:items-center mb-2 lg:mb-3">
									<label className="flex justify-start md:justify-end md:font-medium indent-2.5 text-sm lg:text-base" htmlFor="for-n_password">New password</label>
									<Field id="for-n_password" name="newPassword" type="password" className="grow p-2.5 md:w-80 lg:w-96 h-10 rounded border outline-stone-300/70 focus:outline-cyan-400 bg-white" />
								</div>

								{ values.userEmail && values.newPassword ? (
									<div className="flex justify-center mt-4 lg:mt-5">
										<button type="submit" className="font-medium lg:font-normal text-white bg-cyan-400 w-32 md:w-52 lg:text-base hover:opacity-80" disabled={isSubmitting}>Save Changes</button>
									</div>
								) : null }
							</Form>
						)}
					</Formik>

				</div>
			</div>
		</div>
	);
}

export default Settings;
