import React, { createContext, useContext, useState, ReactNode } from "react";

import { User } from "../types/Types";

type UserContextType = User & {
    updateName(userName: string): void,
    updateEmail(userEmail: string): void,
    updatePassword(userPassword: string): void,
};

const defaultValue: UserContextType = {
	name: "",
	email: "",
	password: "",
	updateName: () => {},
	updateEmail: () => {},
	updatePassword: () => {},
};

const UserContext = createContext<UserContextType>(defaultValue);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const updateName = (userName: string) => {
		setName(userName);
	};

	const updateEmail = (userEmail: string) => {
		setEmail(userEmail);
	};

	const updatePassword = (userPassword: string) => {
		setPassword(userPassword);
	};

	const contextValue: UserContextType = {
		name: name,
		email: email,
		password: password,
		updateName: updateName,
		updateEmail: updateEmail,
		updatePassword: updatePassword,
	};

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};

const useUser = (): UserContextType => {
	return useContext(UserContext);
};

export { useUser };
export { UserProvider };
