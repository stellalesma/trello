import React, { createContext, useContext, useState, ReactNode } from "react";

import { AxiosRequestConfig } from "axios";

type AccessToken = string;

type TokenContextType = {
  config: AxiosRequestConfig;
  updateToken(token: AccessToken) : void;
};

const defaultValue: TokenContextType = {
	config: {},
	updateToken: () => {},
};

const AccessTokenContext = createContext<TokenContextType>(defaultValue);

const AccessTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [accessToken, setAccessToken] = useState<AccessToken>("");

	const updateToken = (token: AccessToken) => {
		setAccessToken(token);
	};

	const config = {
		headers: { Authorization: `Bearer ${accessToken}` }
	};

	return (
		<AccessTokenContext.Provider value={{ config: config, updateToken: updateToken }}>
			{children}
		</AccessTokenContext.Provider>
	);
};

const useAccessToken = (): TokenContextType => {
	return useContext(AccessTokenContext);
};

export { useAccessToken };
export { AccessTokenProvider };
