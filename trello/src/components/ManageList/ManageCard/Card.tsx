import React, { useState, useContext } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

import axios from "axios";
import { Formik, Form, Field, FormikHelpers, FormikState } from "formik";

import CardOptions from "./CardOptions";
import { ListContext } from "../../../utils/ListContext";
import { CardObject, ListObject } from "../../../types/Types";
import { useAccessToken } from "../../../utils/AccessTokenContext";

type CardProps = {
	card: CardObject,
	list: ListObject,
};

type CardValue = {
	title: string,
};

function Card({ card, list }: CardProps) {
	const { config } = useAccessToken();
	const { cards, updateCards } = useContext(ListContext);
	const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
	const [showCardOptions, setShowCardOptions] = useState<boolean>(false);

	const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
		event.stopPropagation();
		setIsTitleEditing(true);
	};

	const handleBlur = (values: CardValue, resetForm: (nextState?: Partial<FormikState<CardValue>>) => void) => {
		if (!values.title) {
			setIsTitleEditing(false);
			resetForm({ values: { title: card.title } });
		}
	};

	const handleCancel = (resetForm: (nextState?: Partial<FormikState<CardValue>>) => void) => {
		setIsTitleEditing(false);
		resetForm({ values: { title: card.title } });
	};

	const handleSubmit = async (values: CardValue, { setSubmitting }: FormikHelpers<CardValue>) => {
		if (values.title) {			
			await axios.patch(`http://localhost:8081/tasks/${card.id}`, { title: values.title }, config)
				.then(() =>	{
					const newCards = cards.map(item => item.id === card.id ? { ...item, title: values.title } : item);
					setSubmitting(false);
					updateCards(newCards);
					setIsTitleEditing(false);
				})
				.catch(error => console.error("Error updating card :", error));
		}
	};

	return (
		<div>
			{isTitleEditing ? (
				<Formik initialValues={{ title: card.title }} onSubmit={handleSubmit}>
					{({ isSubmitting, resetForm, values }) => (
						<Form>
							<Field component="textarea" name="title" placeholder="Enter a title for this card..." onBlur={() => handleBlur(values, resetForm)} className="w-full h-40 p-2.5 mb-1 rounded-md bg-white border border-b-4 border-fuchsia-600/30 border-b-violet-700/[0.35]" autoFocus />
							<div className="mb-2.5">
								<button type="submit" className="mr-2.5 text-white bg-cyan-400" disabled={isSubmitting}>Add card</button>
								<button type="reset" onClick={() => handleCancel(resetForm)} className="text-neutral-600 hover:bg-stone-200">Cancel</button>
							</div>
						</Form>
					)}
				</Formik>
			) : (
				<p className="group flex items-center justify-between px-2.5 py-1 mb-2.5 rounded-md border border-fuchsia-600/30 border-b-4 border-b-violet-700/[0.35] cursor-pointer hover:border-teal-400/50 bg-white" onClick={() => setShowCardOptions(true)}>
					<span className="w-61 white-space-pre-wrap break-words">{card.title}</span>
					<MdOutlineModeEditOutline className="text-4xl p-2 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 hover:bg-pink-100/60" onClick={handleClick} />
				</p>
			)}

			{showCardOptions ? <CardOptions list={list} card={card} onClose={() => setShowCardOptions(false)} /> : null}
		</div>
	);
}

export default Card;
