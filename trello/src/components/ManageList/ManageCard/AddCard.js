import React, { useState, useContext } from "react";

import PropTypes from "prop-types";

import { ListContext } from "../../../utils/ListContext";

function AddCard({ list, listIndex, setFormState }) {
	const [cardTitle, setCardTitle] = useState("");
	const { updatedId, handleListEditing } = useContext(ListContext);

	const handleTitle = (e) => {
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

	const handleSubmit = (e) => {
		e.preventDefault();

		if (cardTitle.trim()) {
			const newCard = { listId: list.id, id: updatedId(), title: cardTitle, description: "", activities: [] };
			handleListEditing(listIndex, {...list, cards: [...list.cards, newCard]});
			setCardTitle("");
			setFormState(false);
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

AddCard.propTypes = {
	list: PropTypes.object.isRequired,
	listIndex: PropTypes.number.isRequired,
	setFormState: PropTypes.func.isRequired,
};

export default AddCard;
