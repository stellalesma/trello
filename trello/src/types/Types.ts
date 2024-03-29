export interface User {
	name: string;
	email: string;
	password: string;
};

export interface ActivityObject {
	id: number;
	cardId: number;
	content: string;
}  
  
export interface CardObject {
	id: number;
	title: string;
	listId: number;
	description: string;
}
  
export interface ListObject {
	id: number;
	title: string;
	userId: number;
}

export interface StaticAttributs {
	id: string;
	name: string;
	className: string;
	placeholder: string;
	styles: {
		marginLeft: number;
		marginBottom: number;
	}
};
