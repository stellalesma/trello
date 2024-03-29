import React, { useState, FormEvent } from "react";
import { IoMdContact } from "react-icons/io";

import axios from "axios";

import Form from "../../Form";
import DeletionModal from "../../DeletionModal";
import { useAccessToken } from "../../../utils/AccessTokenContext";
import { ActivityObject, StaticAttributs } from "../../../types/Types";

function Activity ({ activity }: { activity: ActivityObject }) {
	const { config } = useAccessToken();

	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isDelete, setIsDelete] = useState<boolean>(false);
	const [comment, setComment] = useState<string>(activity.content);

	const deletionWarning = "Deleting a comment is forever. There is no undo.";

	const handleActivityDeleting = async () => {
		await axios.delete(`http://localhost:8081/comments/${activity.id}`, config)
			.then(() => setIsDelete(false))
			.catch(error => console.log("Error removing comment:", error));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
        
		if (comment.trim()) {
			await axios.put(`http://localhost:8081/comments/${activity.id}`, {...activity, content: comment}, config)
				.then(() =>	setIsEdit(false))
				.catch(error => console.log("Error updating comment :", error));
		}
	};

	const handleCancel = () => {
		setIsEdit(false);
		setComment(activity.content);
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
