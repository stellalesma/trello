import React from "react";

import { useState, useContext } from "react";
import { IoMdContact } from "react-icons/io";
import { ListContext } from "../../../utils/ListContext";

import Form from "../../Form";
import DeletionModal from "../../DeletionModal";

function Activity ({ activity }) {
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [comment, setComment] = useState(activity.comment);
	const { lists, handleListEditing, handleModifiedLists } = useContext(ListContext);

	const deletionWarning = "Deleting a comment is forever. There is no undo.";

	const handleActivityDeleting = () => {
		const getNewActivities = (card) => card.activities.filter((act) => act.id !== activity.id);
		const getNewCards = (list) => list.cards.map((card) => card.id === activity.cardId ? {...card, activities: getNewActivities(card)} : card);
		const newLists = lists.map((list) => list.id === activity.listId ?  {...list, cards: getNewCards(list)} : list);

		handleModifiedLists(newLists);
		setIsDelete(false);
	};

	const handleActivityEditing = () => {      // il faut optimiser cette fonction
		const listIndex = lists.findIndex((list) => list.id === activity.listId);
		const cards = lists[listIndex].cards;

		const cardIndex = cards.findIndex((card) => card.id === activity.cardId);
		const activities = cards[cardIndex].activities;

		const activityIndex = activities.findIndex((object) => object.id === activity.id);

		const newActivity = {...activities[activityIndex], comment: comment};
		const newActivities = [...activities];
		newActivities[activityIndex] = newActivity;

		const newCard = {...cards[cardIndex], activities: newActivities};
		const newCards = [...cards];
		newCards[cardIndex] = newCard;

		const newList = {...lists[listIndex], cards: newCards};
		handleListEditing(listIndex, newList);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
        
		if (comment.trim()) {
			handleActivityEditing();
			setIsEdit(false);
		}
	};

	const handleCancel = () => {
		setIsEdit(false);
		setComment(activity.comment);
	};

	const activityAttrs = {
		id: "activityEdit",
		name: "activityEdit",
		className: "w-[520px] h-[70px] p-[10px] mb-[3px] text-sm rounded-[10px] border border-b-[3px] border-[#cbc8c8]/[0.42] bg-white focus:border-[#649EEA]/[0.711] focus:border-b-[#CB9CE8]",
		placeholder: "Write a comment...",
		styles: {
			marginLeft: "0px",
			marginBottom: "0px",
		}
	};

	return (
		<div>
			{isEdit ? (
				<div className="flex mt-[20px]">
					<IoMdContact className="text-[2.5em] mr-[3px] -ml-[8px]" />
					<Form
						value={comment}
						staticAttributs={activityAttrs}
						onClick={handleCancel}
						onSubmit={handleSubmit}
						onChange={(e) => setComment(e.target.value)}
						onBlur={() => !comment.trim() && handleCancel()}
					/>
				</div>
			) : (
				<div className="mt-[20px]">
					<div className="flex">
						<IoMdContact className="text-[2.5em] mr-[3px] -ml-[8px]" />
						<li className="w-[-webkit-fill-available] p-[10px] text-sm white-space-pre-wrap break-words rounded-[10px] border border-b-[3px] border-[#649EEA]/[0.711] border-b-[#CB9CE8] bg-white">
							{activity.comment}
						</li>
					</div>
					<p className="ml-[34px] mt-[5px] text-xs">
						<span className="underline cursor-pointer" onClick={() => { setIsEdit(true);} }>Edit</span>
						<span /> . <span />  
						<span className="underline cursor-pointer" onClick={() => setIsDelete(true)}>Delete</span>
					</p>
					{isDelete ? <DeletionModal modalName="Delete comment ?" text={deletionWarning} onDelete={handleActivityDeleting} onClose={() => setIsDelete(false)} /> : null}
				</div>
			)}
		</div>
	);
}

export default Activity;
