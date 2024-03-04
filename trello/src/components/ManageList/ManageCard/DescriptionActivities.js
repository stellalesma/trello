import React from "react";

import { useState, useContext } from "react";
import { ListContext } from "../../../utils/ListContext";
import { IoMenuOutline, IoListOutline } from "react-icons/io5";

import Form from "../../Form";
import AllActivities from "./AllActivities";

function DescriptionActivities({ card }) {
	const [activity, setActivity] = useState("");
	const [description, setDescription] = useState(card.description);
	const [isActivityEditing, setIsActivityEditing] = useState(false);
	const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

	const { updatedId, lists, handleModifiedLists } = useContext(ListContext);

	const descriptionAttrs = {
		id: "descriptionEditing",
		name: "descriptionEditing",
		className: "grow h-32 p-2.5 ml-8 mb-1.5 text-sm white-space-pre-wrap break-words cursor-text rounded bg-white focus:border focus:border-b-4 focus:border-blue-700/40 focus:border-b-purple-400/40",
		placeholder: "Add a more detailed description...",
		styles: {
			marginLeft: "8",
			marginBottom: "10",
		}
	};

	const activityAttrs = {
		id: "activityEditing",
		name: "activityEditing",
		className: "grow h-20 p-2.5 ml-8 mb-1.5 text-sm rounded-lg border border-b-4 border-stone-300/50 bg-white focus:border-blue-700/40 focus:border-b-purple-400/40",
		placeholder: "Write a comment...",
		styles: {
			marginLeft: "8",
			marginBottom: "0",
		}
	};

	const handleDescription = (e) => {
		setDescription(e.target.value);
	};

	const handleActivity = (e) => {
		setActivity(e.target.value);
	};

	const handleDescriptionReset = () => {
		setIsDescriptionEditing(false);
		setDescription(card.description);
	};

	const handleActivityReset = () => {
		setIsActivityEditing(false);
		setActivity("");
	};

	const handleDescriptionSubmit = (e) => {
		e.preventDefault();

		const getNewCards = (list) => {
			return list.cards.map((object) => object.id === card.id ? {...object, description: description} : object);
		};
		const newLists = lists.map((list) => list.id === card.listId ? {...list, cards: getNewCards(list)} : list);

		handleModifiedLists(newLists);
		setIsDescriptionEditing(false);
	};

	const handleActivitySubmit = (e) => {
		e.preventDefault();

		const newActivity = {listId: card.listId, cardId: card.id, id: updatedId(), comment: activity};
		const getNewCards = (list) => {
			return list.cards.map((object) => object.id === card.id ? {...object, activities: [newActivity, ...object.activities]} : object);
		};
		const newLists = lists.map((list) => list.id === card.listId ? {...list, cards: getNewCards(list)} : list); 

		handleModifiedLists(newLists);
		setIsActivityEditing(false);
		setActivity("");
	};

	return (
		<div className="w-137.5 mr-2.5">
			<div className="flex items-center font-bold text-lg mb-2.5">
				<IoMenuOutline className="mr-2.5 text-2xl" />
				<p>Description</p>
			</div>

			{isDescriptionEditing ? (
				<Form
					value={description}
					staticAttributs={descriptionAttrs}
					onChange={handleDescription}
					onClick={handleDescriptionReset}
					onSubmit={handleDescriptionSubmit}
				/>
			) : (
				<p
					className={description ? "p-2.5 ml-8 mb-10 text-sm white-space-pre-wrap break-words cursor-text rounded bg-neutral-200/[0.77] hover:bg-neutral-300/80" : "h-20 p-2.5 ml-8 mb-10 text-sm white-space-pre-wrap break-words cursor-text rounded bg-neutral-200/[0.77] hover:bg-neutral-300/80"}
					onClick={() => { setIsDescriptionEditing(true); }}
				>
					{description ? description : "Add a more detailed description..."}
				</p>
			)}

			<div className="flex items-center font-bold text-lg mb-2.5">
				<IoListOutline className="mr-2.5 text-2xl" />
				<p>Activity</p>
			</div>

			{isActivityEditing ? (
				<Form
					value={activity}
					staticAttributs={activityAttrs}
					onChange={handleActivity}
					onClick={handleActivityReset}
					onSubmit={handleActivitySubmit}
					onBlur={() => !activity.trim() && handleActivityReset()}
				/>
			) : (
				<p className="h-10 p-2.5 ml-8 text-sm cursor-text rounded-lg border border-stone-300/50 bg-white" onClick={() => { setIsActivityEditing(true); }}>
                    Write a comment...
				</p>
			)}

			<AllActivities activities={card.activities} />
		</div>
	);
}

export default DescriptionActivities;
