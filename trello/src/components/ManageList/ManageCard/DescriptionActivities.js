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
		className: "w-[-webkit-fill-available] h-[120px] p-[10px] ml-[34px] mb-[3px] text-sm white-space-pre-wrap break-words cursor-text rounded-[5px] bg-white focus:border focus:border-b-[3px] focus:border-[#649EEA]/[0.711] focus:border-b-[#CB9CE8]",
		placeholder: "Add a more detailed description...",
		styles: {
			marginLeft: "34px",
			marginBottom: "40px",
		}
	};

	const activityAttrs = {
		id: "activityEditing",
		name: "activityEditing",
		className: "w-[-webkit-fill-available] h-[70px] p-[10px] ml-[34px] mb-[3px] text-sm rounded-[10px] border border-b-[3px] border-[#cbc8c8]/[0.42] bg-white focus:border-[#649EEA]/[0.711] focus:border-b-[#CB9CE8]",
		placeholder: "Write a comment...",
		styles: {
			marginLeft: "34px",
			marginBottom: "0px",
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
		<div className="w-[550px] mr-[10px]">
			<div className="flex items-center font-bold text-lg mb-[10px]">
				<IoMenuOutline className="mr-[10px] text-[1.3em]" />
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
					className={description ? "p-[10px] ml-[34px] mb-[40px] text-sm white-space-pre-wrap break-words cursor-text rounded-[5px] bg-[#e5e5e6]/[0.77] hover:bg-[#CECED0]/[0.77]" : "h-[80px] p-[10px] ml-[34px] mb-[40px] text-sm white-space-pre-wrap break-words cursor-text rounded-[5px] bg-[#e5e5e6]/[0.77] hover:bg-[#CECED0]/[0.77]"}
					onClick={() => { setIsDescriptionEditing(true); }}
				>
					{description ? description : "Add a more detailed description..."}
				</p>
			)}

			<div className="flex items-center font-bold text-lg mb-[10px]">
				<IoListOutline className="mr-[10px] text-[1.2em]" />
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
				<p className="h-[40px] p-[10px] ml-[34px] text-sm cursor-text rounded-[10px] border border-[#cbc8c8]/[0.42] bg-white" onClick={() => { setIsActivityEditing(true); }}>
                    Write a comment...
				</p>
			)}

			<AllActivities activities={card.activities} />
		</div>
	);
}

export default DescriptionActivities;
