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
				<form onSubmit={handleSubmit} className="mt-[20px]">
					<textarea id="card" name="card" placeholder="Enter a title for this card..." value={cardTitle} onChange={handleTitle} onBlur={handleBlur} className="w-full p-[10px] mb-[5px] rounded-[7px] bg-white border border-b-[3px] border-[#b100f2]/30 border-b-[#6500F2]/[0.35]" autoFocus />

					<div>
						<button type="submit" className="mr-[10px] text-white bg-[#01d2ee]">Add card</button>
						<button type="reset" onClick={() => { setShowForm(false); setCardTitle(""); }} className="text-[#4a4a4a] hover:bg-[#ECE9E9]">Cancel</button>
					</div>
				</form>
			) : (
				<p className="flex items-center p-[10px] mt-[20px] rounded-[5px] cursor-pointer hover:bg-[#E8E0EC]" onClick={() => { setShowForm(true); }}>
					<FaPlus className="mr-[5px]" />
                    Add a card
				</p>
			)}
		</div>
	);
}

export default AddCard;
