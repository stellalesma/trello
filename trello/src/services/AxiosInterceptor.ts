import axios, { AxiosResponse, AxiosError } from "axios";

import { NavigateFunction } from "react-router-dom";

interface ErrorResponseData {
    detail: string;
}  

export default function AxiosInterpretor(navigate: NavigateFunction) {
	const handleResponse = (response: AxiosResponse) => {
		return response;
	};

	const handleError = (error: AxiosError) => {
		if (error.response && error.response.data && (error.response.data as ErrorResponseData).detail === "Not authenticated") {
			console.error("Not authenticated error occurred:", (error.response.data as ErrorResponseData).detail);
			navigate("/login");
		}
    	return Promise.reject(error);
	};

	axios.interceptors.response.use(handleResponse, handleError);
}
