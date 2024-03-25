import React, { FormEvent, ChangeEvent } from "react";

import { StaticAttributs } from "types/Types";

type FormProps = {
	value: string,
	onBlur?: () => void,
	onClick: () => void,
	onSubmit: (e: FormEvent<HTMLFormElement>) => void,
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
	staticAttributs: StaticAttributs,
};

function Form({ value, staticAttributs, onBlur, onChange, onClick, onSubmit }: FormProps) {
	return (
		<form onSubmit={onSubmit} className="flex flex-col">
			<textarea id={staticAttributs.id} name={staticAttributs.name} className={staticAttributs.className} placeholder={staticAttributs.placeholder} value={value} onChange={onChange} onBlur={onBlur} autoFocus />
			<div className={`ml-${staticAttributs.styles.marginLeft} mb-${staticAttributs.styles.marginBottom}`}>
				<button type="submit" className="mr-2.5 text-white bg-cyan-400">Save</button>
				<button type="reset" onClick={onClick} className="text-neutral-600 bg-transparent hover:bg-stone-200">Cancel</button>
			</div>
		</form>
	);
}

export default Form;
