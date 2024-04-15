import React, { useState, useContext, FormEvent, ChangeEvent } from "react";

import axios from "axios";

import { ListObject } from "../../../types/Types";
import { ListContext } from "../../../utils/ListContext";
import { useAccessToken } from "../../../utils/AccessTokenContext";

type AddCardProps = {
	list: ListObject,
	setFormState: (state: boolean) => void,
};

function AddCard({ list, setFormState }: AddCardProps) {
	const { config } = useAccessToken();
	const { cards, updateCards } = useContext(ListContext);
	const [cardTitle, setCardTitle] = useState<string>("");

	const handleTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCardTitle(e.target.value);
	};

	const handleBlur = () => {
		if (!cardTitle.trim())
			setFormState(false);
	};

	const handleCancel = () => {
		setFormState(false);
		setCardTitle("");
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (cardTitle.trim()) {
			const newCard = { title: cardTitle, description: "" };
			
			await axios.post(`http://localhost:8081/tasks/${list.id}`, newCard, config)
				.then((response) => {
					const localCard = {id: response.data.data.id, title: cardTitle, description: "", task_list_id: list.id};
					updateCards([...cards, localCard]);
					setFormState(false);
					setCardTitle("");
				})
				.catch((error) => {
					console.error("Error adding card in <", list.title, "> :", error);
				});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mt-5">
			<textarea id="card" name="card" placeholder="Enter a title for this card..." value={cardTitle} onChange={handleTitle} onBlur={handleBlur} className="w-full p-2.5 mb-1.5 rounded-md bg-white border border-b-4 border-fuchsia-600/30 border-b-violet-700/[0.35]" autoFocus />

			<div>
				<button type="submit" className="mr-2.5 text-white bg-cyan-400">Add card</button>
				<button type="reset" onClick={handleCancel} className="text-neutral-600 hover:bg-stone-200">Cancel</button>
			</div>
		</form>
	);
}

export default AddCard;
