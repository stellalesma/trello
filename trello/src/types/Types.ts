export interface User {
	name: string;
	email: string;
	password: string;
};

export interface ActivityObject {
	id: number;
	task_id: number;
	content: string;
}  
  
export interface CardObject {
	description: string;
	title: string;
	id: number;
	task_list_id: number;
}
  
export interface ListObject {
	title: string;
	id: number;
}

export interface StaticAttributs {
	className: string;
	placeholder: string;
	styles: {
		marginLeft: number;
		marginBottom: number;
	}
}

export interface FormValue {
	fieldContent: string,
}
