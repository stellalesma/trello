import React, { useState, useContext } from "react";
import { IoMdContact } from "react-icons/io";

import axios from "axios";
import { FormikHelpers } from "formik";

import Form from "../../Form";
import DeletionModal from "../../DeletionModal";
import { ListContext } from "../../../utils/ListContext";
import { useAccessToken } from "../../../utils/AccessTokenContext";
import { ActivityObject, StaticAttributs, FormValue } from "../../../types/Types";

function Activity ({ activity }: { activity: ActivityObject }) {
	const { config } = useAccessToken();
	const { activities, updateActivities } = useContext(ListContext);

	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isDelete, setIsDelete] = useState<boolean>(false);

	const deletionWarning = "Deleting a comment is forever. There is no undo.";

	const handleActivityDeleting = async () => {
		await axios.delete(`http://localhost:8081/comments/${activity.id}`, config)
			.then(() => {
				updateActivities(activities.filter(act => act.id !== activity.id));
				setIsDelete(false);
			})
			.catch(error => console.error("Error removing comment:", error));
	};

	const handleSubmit = async (values: FormValue, { setSubmitting }: FormikHelpers<FormValue>) => {        
		if (values.fieldContent) {
			await axios.patch(`http://localhost:8081/comments/${activity.id}`, { content: values.fieldContent }, config)
				.then(() =>	{
					const newActivities = activities.map(item => item.id === activity.id ? { ...item, content: values.fieldContent } : item);
					updateActivities(newActivities);
					setSubmitting(false);
					setIsEdit(false);
				})
				.catch(error => console.error("Error updating comment :", error));
		}
	};

	const activityAttrs: StaticAttributs = {
		className: "grow h-20 p-2.5 mb-1.5 text-sm whitespace-pre-wrap break-words rounded-lg border border-b-4 border-stone-300 bg-white focus:border-blue-400 focus:border-b-purple-400",
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
						initialValues={{ fieldContent: activity.content }}
						staticAttributs={activityAttrs}
						onSubmit={handleSubmit}
						setOpening={setIsEdit}
						manageBlur={true}
					/>
				</div>
			) : (
				<div className="mt-5">
					<div className="flex">
						<IoMdContact className="text-4xl mr-1 -ml-2" />
						<li className="grow p-2.5 text-sm whitespace-pre-wrap break-words rounded-lg border border-b-4 border-blue-700/40 border-b-purple-400/40 bg-white">
							{activity.content}
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
