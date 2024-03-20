import React, { useState, useContext, FormEvent, ChangeEvent } from "react";

import Card from "./Card";
import { ListObject } from "types/Types";
import { ListContext } from "../../../utils/ListContext";

type AllCardsProps = {
	list: ListObject,
	listIndex: number,
	isFormVisible: boolean,
	setFormState: (state: boolean) => void,
}

function AllCards({ list, listIndex, isFormVisible, setFormState }: AllCardsProps) {
	const [cardTitle, setCardTitle] = useState<string>("");
	const { getUpdatedId, handleListEditing } = useContext(ListContext);

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

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (cardTitle.trim()) {
			const newCard = { listId: list.id, id: getUpdatedId(), title: cardTitle, description: "", activities: [] };
			handleListEditing(listIndex, {...list, cards: [...list.cards, newCard]});
			setCardTitle("");
			setFormState(false);
		}
	};

	return (
		<div className="overflow-y-auto">
			<ul>
				{list.cards.map((card) =>
					<li key={card.id}>
						<Card card={card} listName={list.title} listIndex={listIndex} />
					</li>
				)}
			</ul>
			{isFormVisible ? (
				<form onSubmit={handleSubmit} className="mt-5">
					<textarea id="card" name="card" placeholder="Enter a title for this card..." value={cardTitle} onChange={handleTitle} onBlur={handleBlur} className="w-full p-2.5 mb-1.5 rounded-md bg-white border border-b-4 border-fuchsia-600/30 border-b-violet-700/[0.35]" autoFocus />

					<div>
						<button type="submit" className="mr-2.5 text-white bg-cyan-400">Add card</button>
						<button type="reset" onClick={handleCancel} className="text-neutral-600 hover:bg-stone-200">Cancel</button>
					</div>
				</form>
			) : null}
		</div>
	);
}

export default AllCards;
