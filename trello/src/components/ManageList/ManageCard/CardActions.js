import React from "react";

import { useState, useContext } from "react";
import { RxDash } from "react-icons/rx";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ListContext } from "../../../utils/ListContext";

import MoveCard from "./MoveCard";
import DeletionModal from "../../DeletionModal";

function CardActions({ card, listName, onMainClose }) {
	const [isMoveCardVisible, setIsMoveCardVisible] = useState(false);
	const [isDeleteCardVisible, setIsDeleteCardVisible] = useState(false);

	const { lists, handleListEditing } = useContext(ListContext);

	const deletionWarning = "All actions will be removed from the activity feed and you won't be able to reopen the card. There is no undo.";

	const handleDelete = () => {
		const listIndex = lists.findIndex((list) => list.id === card.listId);
		const newList = {
			...lists[listIndex],
			cards: lists[listIndex].cards.filter((object) => object.id !== card.id),
		};

		handleListEditing(listIndex, newList);
		setIsDeleteCardVisible(false);
		onMainClose();
	};

	return (
		<div className="w-[140px]">
			<p className="font-bold text-xs">Actions</p>
			<p className="flex items-center w-full h-[35px] mt-[10px] p-[10px] font-bold text-sm cursor-pointer rounded-[5px] bg-[#e5e5e6]/[0.77] hover:bg-[#d3d3d4]/[0.77]" onClick={() => { setIsMoveCardVisible(true); }}>
				<IoIosArrowRoundForward className="mr-[10px]" />
                Move
			</p>
			{isMoveCardVisible ? <MoveCard listName={listName} card={card} onClose={() => { setIsMoveCardVisible(false); }} onMainClose={onMainClose} /> : null}
			<p className="flex items-center w-full h-[35px] mt-[10px] p-[10px] font-bold text-sm cursor-pointer rounded-[5px] bg-[#e5e5e6]/[0.77] hover:bg-[#d3d3d4]/[0.77]" onClick={() => { setIsDeleteCardVisible(true); }}>
				<RxDash className="mr-[10px]" />
                Delete
			</p>
			{isDeleteCardVisible ? <DeletionModal modalName="Delete card ?" text={deletionWarning} onDelete={handleDelete} onClose={() => { setIsDeleteCardVisible(false); }} /> : null}
		</div>
	);
}

export default CardActions;
