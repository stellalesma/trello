import React, { useState, useContext } from "react";

import PropTypes from "prop-types";

import { MdOutlineModeEditOutline } from "react-icons/md";

import CardOptions from "./CardOptions";
import { ListContext } from "../../../utils/ListContext";

function Card({ card, listName, listIndex }) {
	const [cardTitle, setCardTitle] = useState(card.title);
	const [isTitleEditing, setIsTitleEditing] = useState(false);
	const [showCardOptions, setShowCardOptions] = useState(false);

	const { lists, handleListEditing } = useContext(ListContext);

	const handleBlur = () => {
		if (!cardTitle.trim()) {
			setIsTitleEditing(false);
			setCardTitle(card.title);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (cardTitle.trim()) {
			const list = lists[listIndex];
			const newCard = {...card, title: cardTitle};
			const tmp = {
				...list,
				cards: list.cards.map((object) => object.id === card.id ? newCard : object)
			};
    
			handleListEditing(listIndex, tmp);
			setIsTitleEditing(false);
		}
	};

	return (
		<div>
			{isTitleEditing ? (
				<form onSubmit={(event) => handleSubmit(event)}>
					<textarea className="w-full h-40 p-2.5 mb-1 rounded-md bg-white border border-b-4 border-fuchsia-600/30 border-b-violet-700/[0.35]" id='cardEditing' name="cardEditing" value={cardTitle} onChange={(event) => { setCardTitle(event.target.value); }} onBlur={handleBlur} autoFocus />
					<div className='mb-2.5'>
						<button type="submit" className="mr-2.5 text-white bg-cyan-400">Save</button>
						<button type="reset" onClick={() => { setIsTitleEditing(false); setCardTitle(card.title); }} className="text-neutral-600 hover:bg-stone-200">Cancel</button>
					</div>
				</form>
			) : (
				<p className="group flex items-center justify-between px-2.5 py-1 mb-2.5 rounded-md border border-fuchsia-600/30 border-b-4 border-b-violet-700/[0.35] cursor-pointer hover:border-teal-400/50 bg-white" onClick={() => setShowCardOptions(true)}>
					<span className="w-61 white-space-pre-wrap break-words">{cardTitle}</span>
					<MdOutlineModeEditOutline className="text-4xl p-2 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 hover:bg-pink-100/60" onClick={(event) => { event.stopPropagation(); setIsTitleEditing(true); }} />
				</p>
			)}

			{showCardOptions ? <CardOptions listName={listName} card={card} onClose={() => { setShowCardOptions(false); }} /> : null}
		</div>
	);
}

Card.propTypes = {
	card: PropTypes.object.isRequired,
	listName: PropTypes.string.isRequired,
	listIndex: PropTypes.number.isRequired,
};

export default Card;
