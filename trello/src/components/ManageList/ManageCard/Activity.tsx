import React, { useState, useContext, FormEvent } from "react";
import { IoMdContact } from "react-icons/io";

import Form from "../../Form";
import DeletionModal from "../../DeletionModal";
import { ListContext } from "../../../utils/ListContext";
import { ListObject, CardObject, ActivityObject, StaticAttributs } from "types/Types";

function Activity ({ activity }: { activity: ActivityObject }) {
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [comment, setComment] = useState(activity.comment);
	const { lists, handleListEditing, handleModifiedLists } = useContext(ListContext);

	const deletionWarning = "Deleting a comment is forever. There is no undo.";

	const handleActivityDeleting = () => {
		const getNewActivities = (card: CardObject) => card.activities.filter((act) => act.id !== activity.id);
		const getNewCards = (list: ListObject) => list.cards.map((card) => card.id === activity.cardId ? {...card, activities: getNewActivities(card)} : card);
		const newLists = lists.map((list) => list.id === activity.listId ?  {...list, cards: getNewCards(list)} : list);

		handleModifiedLists(newLists);
		setIsDelete(false);
	};

	const handleActivityEditing = () => {
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

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

	const activityAttrs: StaticAttributs = {
		id: "activityEdit",
		name: "activityEdit",
		className: "grow h-20 p-2.5 mb-1.5 text-sm rounded-lg border border-b-4 border-stone-300 bg-white focus:border-blue-400 focus:border-b-purple-400",
		placeholder: "Write a comment...",
		styles: {
			marginLeft: 0,
			marginBottom: 0,
		}
	};

	return (
		<div>
			{isEdit ? (
				<div className="flex mt-5">
					<IoMdContact className="text-4xl mr-1 -ml-2" />
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
				<div className="mt-5">
					<div className="flex">
						<IoMdContact className="text-4xl mr-1 -ml-2" />
						<li className="grow p-2.5 text-sm white-space-pre-wrap break-words rounded-lg border border-b-4 border-blue-700/40 border-b-purple-400/40 bg-white">
							{activity.comment}
						</li>
					</div>
					<p className="ml-8 mt-1.5 text-xs">
						<span className="underline cursor-pointer" onClick={() => { setIsEdit(true);} }>Edit</span>
						&nbsp;&nbsp;·&nbsp;&nbsp;
						<span className="underline cursor-pointer" onClick={() => setIsDelete(true)}>Delete</span>
					</p>
					{isDelete ? <DeletionModal modalName="Delete comment ?" text={deletionWarning} className="flex flex-col w-56 sm:w-64 md:w-80 p-2.5 top-1.5 left-15 z-50 absolute rounded-lg box-border bg-white shadow-custom" onDelete={handleActivityDeleting} onClose={() => setIsDelete(false)} /> : null}
				</div>
			)}
		</div>
	);
}

export default Activity;
