import React, { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa6";

import axios from "axios";
import { Formik, Form, Field, FormikHelpers, FormikState } from "formik";

import { ListContext } from "../../utils/ListContext";
import { useAccessToken } from "../../utils/AccessTokenContext";

type AddListValue = {
	title: string
}

function AddList() {
	const { config } = useAccessToken();
	const { lists, updateLists } = useContext(ListContext);
	const [showForm, setShowForm] = useState<boolean>(false);

	const handleNoFocus = (values: AddListValue, resetForm: (nextState?: Partial<FormikState<AddListValue>>) => void) => {
		if (!values.title) {
			resetForm();   
			setShowForm(false);
		}
	};

	const handleReset = (resetForm: (nextState?: Partial<FormikState<AddListValue>>) => void) => {
		setShowForm(false);
		resetForm();
	};

	const handleSubmit = async (values: AddListValue, { resetForm , setSubmitting}: FormikHelpers<AddListValue>) => {		
		if (values.title) {
			await axios.post("http://localhost:8081/task-list", { title: values.title }, config)
				.then((response) => {
					const localList = { id: response.data.data.id, title: values.title };
					updateLists([...lists, localList]);
					setSubmitting(false);
					setShowForm(false);
					resetForm();
				})
				.catch((error) => {
					console.error("Error adding list :", error);
				});
		}
	};

	return (
		<div>
			{showForm ? (
				<Formik initialValues={{ title: "" }} onSubmit={handleSubmit}>
					{({ values, resetForm, isSubmitting }) => (
						<Form className="w-75 p-2.5 rounded-lg bg-white">
							<Field type="text" name="title" placeholder="Enter list title..." onBlur={() => handleNoFocus(values, resetForm)} className="w-full h-9 p-2.5 mb-2.5 rounded box-border border outline-stone-300/70 focus:outline-cyan-400" autoFocus />
							<div>
					 			<button type="submit" className="mr-2.5 text-white bg-cyan-400" disabled={isSubmitting}>Add list</button>
					 			<button type="reset" onClick={() => handleReset(resetForm)} className="text-neutral-600 hover:bg-stone-200">Cancel</button>
					 		</div>
						</Form>
					)}
				</Formik>
			) : (
				<p className="flex items-center w-75 h-12 pl-2.5 font-bold rounded-lg text-white bg-neutral-100/30 hover:bg-neutral-100/10  cursor-pointer" onClick={() => { setShowForm(true); }}>
					<FaPlus className="mr-1.5"/>
                    Add a list
				</p>
			)}
		</div>
	);
}

export default AddList;
