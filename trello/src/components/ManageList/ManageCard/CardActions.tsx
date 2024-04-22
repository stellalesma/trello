import React, { useContext, useState } from "react";

import { RxDash } from "react-icons/rx";
import { IoIosArrowRoundForward } from "react-icons/io";

import axios from "axios";

import MoveCard from "./MoveCard";
import DeletionModal from "../../DeletionModal";

import { ListContext } from "../../../utils/ListContext";
import { useAccessToken } from "../../../utils/AccessTokenContext";
import { ActivityObject, CardObject, ListObject } from "../../../types/Types";

type CardActionsProps = {
	card: CardObject,
	list: ListObject,
	onMainClose: () => void,
};

function CardActions({ list, card, onMainClose }: CardActionsProps) {
	const { config } = useAccessToken();
	const { cards, activities, updateCards, updateActivities } = useContext(ListContext);

	const [isMoveCardVisible, setIsMoveCardVisible] = useState<boolean>(false);
	const [isDeleteCardVisible, setIsDeleteCardVisible] = useState<boolean>(false);

	const deletionWarning = "All actions will be removed from the activity feed and you won't be able to reopen the card. There is no undo.";

	const handleDelete = async () => {
		try {
			const response = await axios.get(`http://localhost:8081/comments/${card.id}`, config);
			const cardActivities = response.data;
	
			await Promise.all(cardActivities.map(async (act: ActivityObject) => {
				await axios.delete(`http://localhost:8081/comments/${act.id}`, config);
			}));
			updateActivities(activities.filter(obj => obj.task_id !== card.id));
	
			await axios.delete(`http://localhost:8081/tasks/${card.id}`, config);
			updateCards(cards.filter(obj => obj.id !== card.id));
			setIsDeleteCardVisible(false);
			onMainClose();
		} catch (error) {
			console.error("Error while deleting card and comments:", error);
		}
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
					{isMoveCardVisible ? <MoveCard list={list} card={card} onClose={() => { setIsMoveCardVisible(false); }} onMainClose={onMainClose} /> : null}
				</div>
				<div>
					<p className="flex items-center w-full h-9 mt-2.5 p-2.5 font-bold text-sm cursor-pointer rounded bg-neutral-200/[0.77] hover:bg-neutral-300/[0.8]" onClick={() => { setIsDeleteCardVisible(true); }}>
						<RxDash className="mr-2.5" />
						Delete
					</p>
					{isDeleteCardVisible ? <DeletionModal modalName="Delete card ?" text={deletionWarning} className="flex flex-col w-64 md:w-80 p-2.5 right-0 md:-ml-40 top-1.5 z-50 absolute rounded-lg box-border bg-white shadow-custom" onDelete={handleDelete} onClose={() => { setIsDeleteCardVisible(false); }} /> : null}
				</div>
			</div>
		</div>
	);
}

export default CardActions;
