import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { IoMenuOutline, IoListOutline } from "react-icons/io5";

import axios from "axios";

import Form from "../../Form";
import AllActivities from "./AllActivities";
import { ListContext } from "../../../utils/ListContext";
import { useAccessToken } from "../../../utils/AccessTokenContext";
import { CardObject, StaticAttributs } from "../../../types/Types";

function DescriptionActivities({ card }: { card: CardObject }) {
	const { config } = useAccessToken();
	const { cards, activities, updateCards, updateActivities } = useContext(ListContext);

	const [activity, setActivity] = useState<string>("");
	const [description, setDescription] = useState<string>(card.description);
	const [isActivityEditing, setIsActivityEditing] = useState<boolean>(false);
	const [isDescriptionEditing, setIsDescriptionEditing] = useState<boolean>(false);

	const descriptionAttrs: StaticAttributs = {
		id: "descriptionEditing",
		name: "descriptionEditing",
		className: "grow h-32 p-2.5 ml-8 mb-1.5 text-sm white-space-pre-wrap break-words cursor-text rounded bg-white focus:border focus:border-b-4 focus:border-blue-700/40 focus:border-b-purple-400/40",
		placeholder: "Add a more detailed description...",
		styles: {
			marginLeft: 8,
			marginBottom: 10,
		}
	};

	const activityAttrs: StaticAttributs = {
		id: "activityEditing",
		name: "activityEditing",
		className: "grow h-20 p-2.5 ml-8 mb-1.5 text-sm rounded-lg border border-b-4 border-stone-300/50 bg-white focus:border-blue-700/40 focus:border-b-purple-400/40",
		placeholder: "Write a comment...",
		styles: {
			marginLeft: 8,
			marginBottom: 0,
		}
	};

	const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value);
	};

	const handleActivity = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

	const handleDescriptionSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await axios.patch(`http://localhost:8081/tasks/${card.id}`, {description: description}, config)
			.then(() =>	{
				const newCards = cards.map(item => item.id === card.id ? {...item, description: description} : item);
				updateCards(newCards);
				setIsDescriptionEditing(false);
			})
			.catch(error => console.error("Error updating task :", error));
	};

	const handleActivitySubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newActivity = {content: activity};
		const maxId = activities.reduce((max, act) => act.id > max ? act.id : max, 0);
		const localActivity = {id: maxId + 1, task_id: card.id, content: activity};

		await axios.post(`http://localhost:8081/comments/${card.id}`, newActivity, config)
			.then(() => {
				updateActivities([localActivity, ...activities]);
				setIsActivityEditing(false);
				setActivity("");
			})
			.catch((error) => {
				console.error("Error adding comment :", error);
			});
	};

	return (
		<div className="md:w-137.5 mr-2.5">
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

			<AllActivities cardId={card.id} />
		</div>
	);
}

export default DescriptionActivities;
