import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";

import axios from "axios";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";

import ModalAction from "./ModalAction";

import { ListContext } from "../../utils/ListContext";
import { useAccessToken } from "../../utils/AccessTokenContext";
import { ActivityObject, CardObject, ListObject } from "../../types/Types";

type ListActionsProps = {
	list: ListObject,
	onClose: () => void,
	setFormState: (state: boolean) => void,
};

type CopyListValue = {
	title: string,
};

type MoveListValue = {
	position: number,
};

export default function ListActions({ list, setFormState, onClose }: ListActionsProps) {	
	const [isMoveListVisible, setMoveListVisible] = useState<boolean>(false);
	const [isCopyListVisible, setCopyListVisible] = useState<boolean>(false);
	const [isSortTableVisible, setSortTableVisible] = useState<boolean>(false);
	const [isMoveCardsVisible, setMoveCardsVisible] = useState<boolean>(false);
	const [isDeleteListVisible, setDeleteListVisible] = useState<boolean>(false);
	const [isDeleteCardsVisible, setDeleteCardsVisible] = useState<boolean>(false);

	const { config } = useAccessToken();
	const { updateActivities, updateCards, updateLists, activities, cards, lists } = useContext(ListContext);

	const deleteCardsWarning = "This will remove all the cards in this list. There is no undo.";
	const deleteListWarning = "All cards will be removed from the list and you will permanently lose this list. There is no undo.";

	const handleClose = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
		event.stopPropagation();
		onClose();
	};

	const handleAddCard = () => {
		onClose();
		setFormState(true);
	};

	const handleCopyListValidate = (values: CopyListValue) => {
		const errors: Partial<CopyListValue> = {};
		if (!values.title) errors.title = "* This field is required";
		return errors;
	};

	const handleCopyList = async (values: CopyListValue, { setSubmitting }: FormikHelpers<CopyListValue>) => {
		// creer une nouvelle liste                      ok        verified: 
		// creer des cartes avec l'id de la liste        ok        verified:
		// creer des activites avec l'id de la carte

		try {
			const response1 = await axios.get(`http://localhost:8081/task-list/${list.id}/tasks`, config);
			const cardsToCopy = response1.data;
	
			const answer1 = await axios.post("http://localhost:8081/task-list", { title: values.title });
			const localList = { id: answer1.data.data.id, title: values.title };
			updateLists([...lists, localList]);
	
			await Promise.all(cardsToCopy.map(async (item: CardObject) => {
				const newCard = { title: item.title, description: item.description };
				const answer2 = await axios.post(`http://localhost:8081/tasks/${list.id}`, newCard, config);
				const cardId = answer2.data.data.id;
	
				await axios.patch(`http://localhost:8081/tasks/${cardId}`, { task_list_id: item.task_list_id }, config);
				const localCard = { id: cardId, title: item.title, description: item.description, task_list_id: answer1.data.data.id };
				updateCards([...cards, localCard]);

				const response2 = await axios.get(`http://localhost:8081/comments/${item.id}`, config);
				const activitiesToCopy = response2.data;
				await Promise.all(activitiesToCopy.map(async (act: ActivityObject) => {
					const newActivity = { content: act.content };
					const answer3 = await axios.post(`http://localhost:8081/comments/${cardId}`, newActivity, config);
					const activityId = answer3.data.data.id;

					await axios.patch(`http://localhost:8081/comments/${activityId}`, { task_id: act.task_id }, config);
					const localActivity = { id: activityId, task_id: cardId, content: act.content };
					updateActivities([...activities, localActivity]);
				}));
			}));
			setSubmitting(false);
		} catch (error) {
			// console.error();
		}
	};

	const handleMoveList = (values: MoveListValue, { setSubmitting }: FormikHelpers<MoveListValue>) => {

	};

	const handleDeleteCards = async () => {
		try {
			const response = await axios.get(`http://localhost:8081/task-list/${list.id}/tasks`, config);
			const listCards = response.data;
	
			await Promise.all(listCards.map(async (card: CardObject) => {
				const answer = await axios.get(`http://localhost:8081/comments/${card.id}`, config);
				const cardActivities = answer.data;
				await Promise.all(cardActivities.map(async (act: ActivityObject) => {
					await axios.delete(`http://localhost:8081/comments/${act.id}`, config);
				}));
				updateActivities(activities.filter(obj => obj.task_id !== card.id));

				await axios.delete(`http://localhost:8081/tasks/${card.id}`, config);
			}));
			updateCards(cards.filter(obj => obj.task_list_id !== list.id));
			onClose();
		} catch (error) {
			console.error("Error while deleting cards of this list <", `${list.title}`, ">:", error);
		}
	};

	const handleDeleteList = async () => {
		try {
			handleDeleteCards();

			await axios.delete(`http://localhost:8081/task-list/${list.id}`, config);
			updateLists(lists.filter(obj => obj.id !== list.id));
			onClose();
		} catch (error) {
			console.error("Error while deleting list:", error);
		}
	};

	return (
		<div className="relative">
			<div className="flex flex-col w-67 md:w-75 py-2.5 -top-2.5 right-0 rounded-lg absolute bg-white shadow-custom">
				{isCopyListVisible ? (
					<ModalAction modalName="Copy List" setAnything={setCopyListVisible} onClose={handleClose}>
						<Formik initialValues={{ title: list.title }} validate={handleCopyListValidate} onSubmit={handleCopyList}>
							{({ isSubmitting }) => (
								<Form className="px-3 border-bo">
									<label htmlFor="listName" className="font-semibold text-sm ml-0.5">Name</label>
									<Field as="textarea" id="listName" name="title" placeholder="Enter a title for your list..." className="w-full h-24 mt-0.5 p-2 rounded border box-border border-stone-300/70 focus:border-cyan-400" autoFocus />
									<ErrorMessage name="title" component="p" className="text-red-600 text-xs ml-2.5" />
									<button type="submit" className="text-white font-medium bg-cyan-400 w-full mr-2.5 mt-2.5 cursor-pointer" disabled={isSubmitting}>Create list</button>
								</Form>
							)}
						</Formik>
					</ModalAction>
				) : (isMoveListVisible ? (
					<ModalAction modalName="Move List" setAnything={setMoveListVisible} onClose={onClose}>
						<Formik initialValues={{ position: 0 }} onSubmit={handleMoveList}>
							{({ isSubmitting }) => (						
								<Form className="px-2.5 pt-1.5">
									<div className="flex flex-col h-20 p-2.5 mb-2.5 rounded bg-neutral-200/[0.77]">
										<label htmlFor="dropDownList" className="font-bold text-sm">Position</label>
										<Field as="select" id="dropDownList" name="position" className="h-full">
											{lists.map((item, index) => <option key={item.id} value={item.title}>{index + 1}</option>)}
										</Field>
									</div>
									<p id="dropDownPosition" className="text-red-600 text-xs mt-2 mb-3">*Postponed Feature</p>

									<button type='submit' className="text-white bg-cyan-400 w-full mt-1 cursor-pointer" disabled={isSubmitting}>Save</button>
								</Form>
							)}
						</Formik>
					</ModalAction>
				) : (isSortTableVisible ? (
					<ModalAction modalName="Sort List" setAnything={setSortTableVisible} onClose={onClose}>
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Date created (newest first)</p>
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Date created (oldest first)</p>
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Card name (alphabetically)</p>
					</ModalAction>
				) : (isMoveCardsVisible ? (
					<ModalAction modalName="Move all cards" setAnything={setMoveCardsVisible} onClose={onClose}>
						<p className="text-sm font-semibold pl-2.5 mb-2">Choose list for moving cards :</p>
						{lists.map(item => item.id === list.id ? 
							<p key={item.id} className="px-5 py-2 text-neutral-400">{item.title} (current)</p> : 
							<p key={item.id} className="px-5 py-2 cursor-pointer hover:bg-pink-100/60">{item.title}</p>
						)}
					</ModalAction>
				) : (isDeleteCardsVisible ? (
					<ModalAction modalName="Delete all cards?" setAnything={setDeleteCardsVisible} onClose={onClose}>
						<div className="px-2.5">
							<p className="leading-6 mb-5">{deleteCardsWarning}</p>
							<button className="w-full text-white font-bold bg-red-600 hover:bg-red-700" onClick={handleDeleteCards}>Delete cards</button>
						</div>
					</ModalAction>
				) : (isDeleteListVisible ? (
					<ModalAction modalName="Delete this list?" setAnything={setDeleteListVisible} onClose={onClose}>
						<div className="px-2.5">
							<p className="leading-6 mb-5">{deleteListWarning}</p>
							<button className="w-full text-white font-bold bg-red-600 hover:bg-red-700" onClick={handleDeleteList}>Delete list</button>
						</div>
					</ModalAction>
				) : (
					<div>
						<div className="flex items-center justify-between mb-3.5 pr-2.5">
							<p className="w-full font-bold text-center">List actions</p>
							<IoMdClose className="text-4xl p-2 rounded cursor-pointer hover:bg-teal-100/70" onClick={handleClose} />
						</div>
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60" onClick={handleAddCard}>Add card</p>
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60" onClick={() => setCopyListVisible(true)}>Copy list</p>
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60" onClick={() => setMoveListVisible(true)}>Move list</p>
						<hr />
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60" onClick={() => setSortTableVisible(true)}>Sort by...</p>
						<hr />
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60" onClick={() => setMoveCardsVisible(true)}>Move all cards in this list</p>
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60" onClick={() => setDeleteCardsVisible(true)}>Delete all cards in this list</p>
						<hr />
						<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60" onClick={() => setDeleteListVisible(true)}>Delete this list</p>
					</div>
				))))))}
			</div>
		</div>
	);
}
