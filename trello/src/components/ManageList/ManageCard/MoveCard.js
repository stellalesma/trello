import React, { useState, useContext } from "react";

import PropTypes from "prop-types";

import { IoMdClose } from "react-icons/io";

import { ListContext } from "../../../utils/ListContext";

export default function MoveCard({ listName, card, onClose, onMainClose }) {
	const { lists, handleModifiedLists } = useContext(ListContext);

	const findAList = (lists, searchedTitle) => {
		return lists.find(object => object.title === searchedTitle);
	};

	const findCardsNb = (cards) => {
		return cards.length;
	};

	const findCardIndex = (cards, cardTitle) => {
		return cards.findIndex(object => object.title === cardTitle);
	};

	const currentList = findAList(lists, listName);
	const [selectedList, setSelectedList] = useState(listName);
	const currentPosition = findCardIndex(currentList.cards, card.title) + 1;
	const [selectedPosition, setSelectedPosition] = useState(currentPosition);
	const suggestedPosition = findCardsNb(findAList(lists, selectedList).cards) + 1;

	const handleListChange = (e) => {
		setSelectedList(e.target.value);
		setSelectedPosition(listName !== e.target.value ? findCardsNb(findAList(lists, e.target.value).cards) + 1 : currentPosition);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const currentList = findAList(lists, listName);
		const chosenList = findAList(lists, selectedList);

		if (listName !== selectedList) {
			currentList.cards.splice(currentPosition - 1, 1);
			chosenList.cards.splice(selectedPosition - 1, 0, card);
		} else if (listName === selectedList && currentPosition !== selectedPosition) {
			currentList.cards.splice(currentPosition - 1, 1);
			currentList.cards.splice(selectedPosition - 1, 0, card);
		}

		handleModifiedLists([...lists]);
		onClose();
		onMainClose();
	};

	return (
		<div className="w-72 p-2.5 ml-16 mt-1.5 z-40 rounded-md box-border fixed bg-white shadow-custom">
			<div className="flex items-center justify-between mb-6">
				<p className="font-bold w-full text-center">Move card</p>
				<IoMdClose className="text-3xl p-1 rounded-full cursor-pointer hover:bg-stone-200" onClick={onClose} />
			</div>

			<p className="font-bold text-sm mb-3.5">Select destination</p>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-col h-20 p-2.5 mb-2.5 rounded bg-neutral-200/[0.77]">
					<label htmlFor="dropDownList" className="font-bold text-sm">List</label>
					<select id="dropDownList" name="dropDownList" value={selectedList} onChange={handleListChange} className="h-full">
						{lists.map((list) => 
							<option key={list.id} value={list.title}>{list.title}</option>
						)}
					</select>
				</div>

				<div className="flex flex-col h-20 p-2.5 mb-3.5 rounded bg-neutral-200/[0.77]">
					<label htmlFor="dropDownPosition" className="font-bold text-sm">Position</label>
					<select id="dropDownPosition" name="dropDownPosition" value={selectedPosition} onChange={(e) => { setSelectedPosition(e.target.value); }} className="h-full">
						{findAList(lists, selectedList).cards.map((card, index) => 
							<option key={card.id} value={index + 1}>{index + 1}</option>
						)}
						{listName !== selectedList ? <option value={suggestedPosition}>{suggestedPosition}</option> : null}
					</select>
				</div>

				<div className="flex w-full justify-center">
					<button type='submit' className="text-white bg-cyan-400">Save</button>
				</div>
			</form>

		</div>
	);
}

MoveCard.propTypes = {
	card: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	listName: PropTypes.string.isRequired,
	onMainClose: PropTypes.func.isRequired,
};
