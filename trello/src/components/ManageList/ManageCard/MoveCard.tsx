import React, { useContext, ChangeEvent, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";

import axios from "axios";
import { Formik, Form, Field, FormikHelpers, FormikErrors } from "formik";

import { ListContext } from "../../../utils/ListContext";
import { ListObject, CardObject } from "../../../types/Types";
import { useAccessToken } from "../../../utils/AccessTokenContext";

type MoveCardProps = {
	list: ListObject,
	card: CardObject,
	onClose: () => void,
	onMainClose: () => void,
};

type MoveCardValues = {
	selectedList: ListObject,
};

export default function MoveCard({ list, card, onClose, onMainClose }: MoveCardProps) {
	const { config } = useAccessToken();
	const { lists, cards, updateCards } = useContext(ListContext);

	const handleListChange = async (e: ChangeEvent<HTMLSelectElement>, setValues: (values: SetStateAction<MoveCardValues>, shouldValidate?: boolean) => Promise<void | FormikErrors<MoveCardValues>>) => {
		const foundList = lists.find(object => object.title === e.target.value);
		if (foundList) await setValues({ selectedList: foundList });
	};

	const handleSubmit = async (values: MoveCardValues, { setSubmitting }: FormikHelpers<MoveCardValues>) => {
		await axios.patch(`http://localhost:8081/tasks/${card.id}`, {task_list_id: values.selectedList.id}, config)
			.then(() => {
				const newCards = cards.map(item => item.id === card.id ? {...item, task_list_id: values.selectedList.id} : item);
				onClose();
				onMainClose();
				setSubmitting(false);
				updateCards(newCards);
			})
			.catch((error) => console.error("Error removing card:", error));
	};

	return (
		<div className="relative">
			<div className="w-64 md:w-72 p-2.5 left-0 md:right-0 md:left-auto top-1.5 z-40 rounded-md box-border absolute bg-white shadow-custom">
				<div className="flex items-center justify-between mb-6">
					<p className="font-bold w-full text-center">Move card</p>
					<IoMdClose className="text-3xl p-1 rounded-full cursor-pointer hover:bg-stone-200" onClick={onClose} />
				</div>

				<p className="font-bold text-sm mb-3.5">Select destination</p>

				<Formik initialValues={{ selectedList: list }} onSubmit={handleSubmit}>
					{({ isSubmitting, setValues, values }) => (						
						<Form>
							<div className="flex flex-col h-20 p-2.5 mb-2.5 rounded bg-neutral-200/[0.77]">
								<label htmlFor="dropDownList" className="font-bold text-sm">List</label>
								<Field as="select" id="dropDownList" name="selectedList" value={values.selectedList.title} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleListChange(e, setValues)} className="h-full">
									{lists.map((item) => 
										<option key={item.id} value={item.title}>{item.title}</option>
									)}
								</Field>
							</div>

							<div className="flex flex-col h-20 p-2.5 mb-3.5 rounded bg-neutral-200/[0.77]">
								<label htmlFor="dropDownPosition" className="font-bold text-sm">Position</label>
								<p id="dropDownPosition" className="text-red-600 text-xs mt-2">*Postponed Feature</p>
							</div>

							<div className="flex w-full justify-center">
								<button type='submit' className="text-white bg-cyan-400" disabled={isSubmitting}>Save</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
