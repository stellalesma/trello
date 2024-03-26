import React, { createContext, useContext, useState, ReactNode } from "react";

type AccessToken = string;

type TokenContextType = {
  token: AccessToken;
  updateToken(token: AccessToken) : void;
};

const defaultValue: TokenContextType = {
	token: "",
	updateToken: () => {},
};

const AccessTokenContext = createContext<TokenContextType>(defaultValue);

const AccessTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [accessToken, setAccessToken] = useState<AccessToken>("");

	const updateToken = (token: AccessToken) => {
		setAccessToken(token);
	};

	return (
		<AccessTokenContext.Provider value={{ token: accessToken, updateToken: updateToken }}>
			{children}
		</AccessTokenContext.Provider>
	);
};

const useAccessToken = (): TokenContextType => {
	return useContext(AccessTokenContext);
};

export { useAccessToken };
export { AccessTokenProvider };
