import React, { useState, useContext } from "react";
import { IoMenuOutline, IoListOutline } from "react-icons/io5";

import axios from "axios";
import { FormikHelpers } from "formik";

import Form from "../../Form";
import AllActivities from "./AllActivities";
import { ListContext } from "../../../utils/ListContext";
import { useAccessToken } from "../../../utils/AccessTokenContext";
import { CardObject, FormValue, StaticAttributs } from "../../../types/Types";

function DescriptionActivities({ card }: { card: CardObject }) {
	const { config } = useAccessToken();
	const { cards, activities, updateCards, updateActivities } = useContext(ListContext);

	const [isActivityEditing, setIsActivityEditing] = useState<boolean>(false);
	const [isDescriptionEditing, setIsDescriptionEditing] = useState<boolean>(false);

	const descriptionAttrs: StaticAttributs = {
		className: "grow h-32 p-2.5 ml-8 mb-1.5 text-sm whitespace-pre-wrap break-words cursor-text rounded bg-white focus:border focus:border-b-4 focus:border-blue-700/40 focus:border-b-purple-400/40",
		placeholder: "Add a more detailed description...",
		styles: {
			marginLeft: 8,
			marginBottom: 10,
		}
	};

	const activityAttrs: StaticAttributs = {
		className: "grow h-20 p-2.5 ml-8 mb-1.5 text-sm whitespace-pre-wrap break-words rounded-lg border border-b-4 border-stone-300/50 bg-white focus:border-blue-700/40 focus:border-b-purple-400/40",
		placeholder: "Write a comment...",
		styles: {
			marginLeft: 8,
			marginBottom: 0,
		}
	};

	const handleDescriptionSubmit = async (values: FormValue, { setSubmitting }: FormikHelpers<FormValue>) => {
		await axios.patch(`http://localhost:8081/tasks/${card.id}`, { description: values.fieldContent }, config)
			.then(() =>	{
				const newCards = cards.map(item => item.id === card.id ? { ...item, description: values.fieldContent } : item);
				setIsDescriptionEditing(false);
				updateCards(newCards);
				setSubmitting(false);
			})
			.catch(error => console.error("Error updating task :", error));
	};

	const handleActivitySubmit = async (values: FormValue, { setSubmitting, resetForm }: FormikHelpers<FormValue>) => {
		await axios.post(`http://localhost:8081/comments/${card.id}`, { content: values.fieldContent }, config)
			.then((response) => {
				const localActivity = {id: response.data.data.id, task_id: card.id, content: values.fieldContent };
				updateActivities([localActivity, ...activities]);
				setIsActivityEditing(false);
				setSubmitting(false);
				resetForm();
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
					initialValues={{ fieldContent: card.description }}
					setOpening={setIsDescriptionEditing}
					staticAttributs={descriptionAttrs}
					onSubmit={handleDescriptionSubmit}
					manageBlur={false}
				/>
			) : (
				<p className={`${card.description ? "" : "h-20"} p-2.5 ml-8 mb-10 text-sm whitespace-pre-wrap break-words cursor-text rounded bg-neutral-200/[0.77] hover:bg-neutral-300/80`} onClick={() => { setIsDescriptionEditing(true); }}>
					{card.description ? card.description : "Add a more detailed description..."}
				</p>
			)}

			<div className="flex items-center font-bold text-lg mb-2.5">
				<IoListOutline className="mr-2.5 text-2xl" />
				<p>Activity</p>
			</div>

			{isActivityEditing ? (
				<Form
					initialValues={{ fieldContent: "" }}
					setOpening={setIsActivityEditing}
					staticAttributs={activityAttrs}
					onSubmit={handleActivitySubmit}
					manageBlur={true}
				/>
			) : (
				<p className="h-10 p-2.5 ml-8 text-sm whitespace-pre-wrap break-words cursor-text rounded-lg border border-stone-300/50 bg-white" onClick={() => { setIsActivityEditing(true); }}>
                    Write a comment...
				</p>
			)}

			<AllActivities cardId={card.id} />
		</div>
	);
}

export default DescriptionActivities;
