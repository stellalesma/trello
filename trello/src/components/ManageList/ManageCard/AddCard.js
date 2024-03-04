import React from "react";

import { useState, useContext } from "react";
import { ListContext } from "../../../utils/ListContext";

import { FaPlus } from "react-icons/fa6";

function AddCard({ list, listIndex }) {
	const [cardTitle, setCardTitle] = useState("");
	const [showForm, setShowForm] = useState(false);
	const { updatedId, handleListEditing } = useContext(ListContext);

	const handleTitle = (e) => {
		setCardTitle(e.target.value);
	};

	const handleBlur = () => {
		if (!cardTitle.trim())
			setShowForm(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (cardTitle.trim()) {
			const newCard = { listId: list.id, id: updatedId(), title: cardTitle, description: "", activities: [] };
			handleListEditing(listIndex, {...list, cards: [...list.cards, newCard]});
			setCardTitle("");
			setShowForm(false);
		}
	};

	return (
		<div>
			{showForm ? (
				<form onSubmit={handleSubmit} className="mt-5">
					<textarea id="card" name="card" placeholder="Enter a title for this card..." value={cardTitle} onChange={handleTitle} onBlur={handleBlur} className="w-full p-2.5 mb-1.5 rounded-md bg-white border border-b-4 border-fuchsia-600/30 border-b-violet-700/[0.35]" autoFocus />

					<div>
						<button type="submit" className="mr-2.5 text-white bg-cyan-400">Add card</button>
						<button type="reset" onClick={() => { setShowForm(false); setCardTitle(""); }} className="text-neutral-600 hover:bg-stone-200">Cancel</button>
					</div>
				</form>
			) : (
				<p className="flex items-center p-2.5 mt-5 rounded cursor-pointer hover:bg-pink-100/60" onClick={() => { setShowForm(true); }}>
					<FaPlus className="mr-1.5" />
                    Add a card
				</p>
			)}
		</div>
	);
}

export default AddCard;
