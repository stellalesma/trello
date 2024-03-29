import React, { useState, useContext, /*useEffect,*/ FormEvent, ChangeEvent } from "react";
import { IoMdClose } from "react-icons/io";

import axios from "axios";

import { ListContext } from "../../../utils/ListContext";
import { ListObject, CardObject } from "../../../types/Types";
import { useAccessToken } from "../../../utils/AccessTokenContext";

type MoveCardProps = {
	list: ListObject,
	card: CardObject,
	onClose: () => void,
	onMainClose: () => void,
};

export default function MoveCard({ list, card, onClose, onMainClose }: MoveCardProps) {
	const { config } = useAccessToken();
	const { lists } = useContext(ListContext);
	// const [cardsOfList, setCardsOfList] = useState<CardObject[]>([]);
	// const [currentCards, setCurrentCards] = useState<CardObject[]>([]);
	const [selectedList, setSelectedList] = useState<ListObject>(list);	

	// const getCardsOfList = async (listId: number, setCards: (cardsList: CardObject[]) => void) => {
	// 	try {
	// 		const response = await axios.get(`http://localhost:8081/tasks/${listId}`, config);
	// 		setCards(response.data);
	// 	} catch (error) {
	// 		console.error("Error getting tasks by task list id :", error);
	// 	}
	// };

	// getCardsOfList(list.id, setCurrentCards);
	// const currentPosition = currentCards.findIndex(obj => obj.id === card.id);
	// const [selectedPosition, setSelectedPosition] = useState<number>(currentPosition);

	// useEffect(() => {
	// 	if (selectedList) {
	// 		getCardsOfList(selectedList.id, setCardsOfList);
	// 	}
	// }, [config, selectedList]);

	const handleListChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const foundList = lists.find(object => object.title === e.target.value);
		if (foundList) setSelectedList(foundList);
		// setSelectedPosition(list.title !== e.target.value ? cardsOfList.length + 1 : currentPosition);
	};

	// const handlePositionChange = (e: ChangeEvent<HTMLSelectElement>) => {
	// 	setSelectedPosition(parseInt(e.target.value));
	// };

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newCard = {...card, task_list_id: selectedList.id};
		await axios.put(`http://localhost:8081/tasks/${card.id}`, newCard, config)
			.then(() => {
				onClose();
				onMainClose();
			})
			.catch((error) => console.log("Error removing card:", error));
	};

	return (
		<div className="relative">
			<div className="w-64 md:w-72 p-2.5 left-0 md:right-0 md:left-auto top-1.5 z-40 rounded-md box-border absolute bg-white shadow-custom">
				<div className="flex items-center justify-between mb-6">
					<p className="font-bold w-full text-center">Move card</p>
					<IoMdClose className="text-3xl p-1 rounded-full cursor-pointer hover:bg-stone-200" onClick={onClose} />
				</div>

				<p className="font-bold text-sm mb-3.5">Select destination</p>

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col h-20 p-2.5 mb-2.5 rounded bg-neutral-200/[0.77]">
						<label htmlFor="dropDownList" className="font-bold text-sm">List</label>
						<select id="dropDownList" name="dropDownList" value={selectedList.title} onChange={handleListChange} className="h-full">
							{lists.map((item) => 
								<option key={item.id} value={item.title}>{item.title}</option>
							)}
						</select>
					</div>

					<div className="flex flex-col h-20 p-2.5 mb-3.5 rounded bg-neutral-200/[0.77]">
						<label htmlFor="dropDownPosition" className="font-bold text-sm">Position</label>
						{/* <select id="dropDownPosition" name="dropDownPosition" value={selectedPosition} onChange={handlePositionChange} className="h-full">
							{cardsOfList.map((obj, index) =>
								<option key={obj.id} value={index + 1}>{index + 1}</option>
							)}
							{list.id !== selectedList.id ? <option value={cardsOfList.length + 1}>{cardsOfList.length + 1}</option> : null}
						</select> */}
						<p className="text-red-600 text-xs mt-2">*Postponed Feature</p>
					</div>

					<div className="flex w-full justify-center">
						<button type='submit' className="text-white bg-cyan-400">Save</button>
					</div>
				</form>

			</div>
		</div>
	);
}
