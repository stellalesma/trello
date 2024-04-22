import React, { useState } from "react";
import { FaTrello } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { IoChevronBackOutline } from "react-icons/io5";

import axios, { AxiosError } from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

import { useAccessToken } from "../utils/AccessTokenContext";

type ResetPasswordValue = {
	email: string
};

type NewPasswordValues = {
	otp: string,
	email: string,
	password: string,
};

function PasswordReset() {
	const navigate = useNavigate();
	const { addToast } = useToasts();
	const { updateToken } = useAccessToken();

	const [emailEntered, setEmailEntered] = useState<string>("");
	const [canEnterCode, setCanEnterCode] = useState<boolean>(false);

	const handleResetValidate = (value: ResetPasswordValue) => {
		const error: Partial<ResetPasswordValue> = {};
		if (!value.email) error.email = "* This field is required";
		return error;
	};

	const handleNewValidate = (values: NewPasswordValues) => {
		const errors: Partial<NewPasswordValues> = {};

		values.email = emailEntered;
		if (!values.otp) errors.otp = "* This field is required";
		if (!values.password) errors.password = "* This field is required";
		return errors;
	};

	const handleResetSubmit = async (value: ResetPasswordValue, { setSubmitting }: FormikHelpers<ResetPasswordValue>) => {
		await axios.put("http://localhost:8081/user/reset-password", value)
			.then(response => {
				setSubmitting(false);
				setCanEnterCode(true);
				setEmailEntered(value.email);
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
	};

	const handleNewSubmit = async (values: NewPasswordValues, { setSubmitting }: FormikHelpers<NewPasswordValues>) => {
		try {
			const response = await axios.put("http://localhost:8081/user/new-password", values);
			addToast(response.data.message, { appearance: "success", autoDismiss: true });

			const answer = await axios.post("http://localhost:8081/user/login", { email: values.email, password: values.password });
			addToast("Login successful!", { appearance: "success", autoDismiss: true });
			updateToken(answer.data.access_token);
			setSubmitting(false);
			navigate("/home");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 400)
					addToast(error.response.data.detail, { appearance: "error", autoDismiss: false });
				else
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

					<Formik initialValues={{ otp: "", email: "", password: "" }} validate={handleNewValidate} onSubmit={handleNewSubmit}>
						{({ isSubmitting }) => (
							<Form className="flex flex-col">
								<label htmlFor="new-code" className="text-xs font-bold ml-1">You received a code :</label>
								<Field id="new-code" name="otp" className="p-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter the code..." type="text" />
								<ErrorMessage name="otp" component="p" className="text-red-600 text-xs ml-2.5" />
								<label htmlFor="new-password" className="text-xs font-bold ml-1 mt-2.5">Set your new password :</label>
								<Field id="new-password" name="password" className="p-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter new password..." type="password" />
								<ErrorMessage name="password" component="p" className="text-red-600 text-xs mb-1 ml-2.5" />

								<button className="w-full h-10 mt-3.5 font-bold text-base text-white bg-cyan-400 hover:bg-cyan-300" type="submit" disabled={isSubmitting}>Submit</button>
							</Form>
						)}
					</Formik>
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
						<Formik initialValues={{ email: "" }} validate={handleResetValidate} onSubmit={handleResetSubmit}>
							{({ isSubmitting }) => (
								<Form className="flex flex-col">
									<Field name="email" className="p-2.5 rounded border outline-stone-300/70 focus:outline-cyan-400" placeholder="Enter your email..." type="email" />
									<ErrorMessage name="email" component="p" className="text-red-600 text-xs mb-1 ml-2.5" />
									<button className="w-full h-10 mt-3.5 font-bold text-base text-white bg-cyan-400 hover:bg-cyan-300" type="submit" disabled={isSubmitting}>Send recovery code</button>
								</Form>
							)}
						</Formik>

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
