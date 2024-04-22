import React, { useContext } from "react";

import axios from "axios";
import { Formik, Form, Field, FormikHelpers, FormikState } from "formik";

import { ListObject } from "../../../types/Types";
import { ListContext } from "../../../utils/ListContext";
import { useAccessToken } from "../../../utils/AccessTokenContext";

type AddCardProps = {
	list: ListObject,
	setFormState: (state: boolean) => void,
};

type AddCardValue = {
	title: string,
};

function AddCard({ list, setFormState }: AddCardProps) {
	const { config } = useAccessToken();
	const { cards, updateCards } = useContext(ListContext);

	const handleBlur = (values: AddCardValue, resetForm: (nextState?: Partial<FormikState<AddCardValue>>) => void) => {
		if (!values.title) {
			resetForm();
			setFormState(false);
		}
	};

	const handleCancel = (resetForm: (nextState?: Partial<FormikState<AddCardValue>>) => void) => {
		resetForm();
		setFormState(false);
	};

	const handleSubmit = async (values: AddCardValue, { setSubmitting, resetForm }: FormikHelpers<AddCardValue>) => {
		if (values.title) {
			const newCard = { title: values.title, description: "" };
			
			await axios.post(`http://localhost:8081/tasks/${list.id}`, newCard, config)
				.then((response) => {
					const localCard = {id: response.data.data.id, title: values.title, description: "", task_list_id: list.id};
					updateCards([...cards, localCard]);
					setSubmitting(false);
					setFormState(false);
					resetForm();
				})
				.catch((error) => {
					console.error("Error adding card in <", list.title, "> :", error);
				});
		}
	};

	return (
		<Formik initialValues={{ title: "" }} onSubmit={handleSubmit}>
			{({ isSubmitting, resetForm, values }) => (
				<Form className="mt-5">
					<Field component="textarea" name="title" placeholder="Enter a title for this card..." onBlur={() => handleBlur(values, resetForm)} className="w-full p-2.5 mb-1.5 rounded-md bg-white border border-b-4 border-fuchsia-600/30 border-b-violet-700/[0.35]" autoFocus />
					<div>
				 		<button type="submit" className="mr-2.5 text-white bg-cyan-400" disabled={isSubmitting}>Add card</button>
				 		<button type="reset" onClick={() => handleCancel(resetForm)} className="text-neutral-600 hover:bg-stone-200">Cancel</button>
				 	</div>
				</Form>
			)}
		</Formik>
	);
}

export default AddCard;
