import React, { useState, useContext } from "react";

import PropTypes from "prop-types";

import { RxDash } from "react-icons/rx";
import { IoIosArrowRoundForward } from "react-icons/io";

import MoveCard from "./MoveCard";
import DeletionModal from "../../DeletionModal";
import { ListContext } from "../../../utils/ListContext";

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
		<div className="md:w-36 mt-10 md:mt-0 relative">
			<p className="font-bold text-xs">Actions</p>
			<div className="grid grid-cols-2 gap-2.5 md:flex md:flex-col md:gap-0">
				<div>
					<p className="flex items-center w-full h-9 mt-2.5 p-2.5 font-bold text-sm cursor-pointer rounded bg-neutral-200/[0.77] hover:bg-neutral-300/[0.8]" onClick={() => { setIsMoveCardVisible(true); }}>
						<IoIosArrowRoundForward className="mr-2.5" />
						Move
					</p>
					{isMoveCardVisible ? <MoveCard listName={listName} card={card} onClose={() => { setIsMoveCardVisible(false); }} onMainClose={onMainClose} /> : null}
				</div>
				<div>
					<p className="flex items-center w-full h-9 mt-2.5 p-2.5 font-bold text-sm cursor-pointer rounded bg-neutral-200/[0.77] hover:bg-neutral-300/[0.8]" onClick={() => { setIsDeleteCardVisible(true); }}>
						<RxDash className="mr-2.5" />
						Delete
					</p>
					{isDeleteCardVisible ? <DeletionModal modalName="Delete card ?" text={deletionWarning} style="flex flex-col w-64 md:w-80 p-2.5 right-0 md:-ml-40 top-1.5 z-50 absolute rounded-lg box-border bg-white shadow-custom" onDelete={handleDelete} onClose={() => { setIsDeleteCardVisible(false); }} /> : null}
				</div>
			</div>
		</div>
	);
}

CardActions.propTypes = {
	card: PropTypes.object.isRequired,
	listName: PropTypes.string.isRequired,
	onMainClose: PropTypes.func.isRequired,
};

export default CardActions;
