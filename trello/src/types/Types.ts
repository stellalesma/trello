export interface User {
	name: string;
	email: string;
	password: string;
};

export interface ActivityObject {
	id: number;
	listId: number;
	cardId: number;
	comment: string;
}  
  
export interface CardObject {
	id: number;
	title: string;
	listId: number;
	description: string;
	activities: ActivityObject[];
}
  
export interface ListObject {
	id: number;
	title: string;
	cards: CardObject[];
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
