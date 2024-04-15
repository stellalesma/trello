import axios, { AxiosResponse, AxiosError } from "axios";

import { AddToast } from "react-toast-notifications";
import { NavigateFunction } from "react-router-dom";

type ErrorResponseData = {
    detail: string;
}  

type AxiosInterpretorProps = {
	addToast: AddToast;
	navigate: NavigateFunction;
  }
  
export default function AxiosInterpretor({ addToast, navigate }: AxiosInterpretorProps) {
	const handleResponse = (response: AxiosResponse) => {
		return response;
	};

	const handleError = (error: AxiosError) => {
		if (error.response && error.response.data && (error.response.data as ErrorResponseData).detail === "Not authenticated") {
			console.error("Not authenticated error occurred:", (error.response.data as ErrorResponseData).detail);
			addToast((error.response.data as ErrorResponseData).detail, { appearance: "error", autoDismiss: false });
			navigate("/login");
		}
    	return Promise.reject(error);
	};

	axios.interceptors.response.use(handleResponse, handleError);
}
