import React from "react";

import { Formik, Form as FormikForm, Field, FormikHelpers, FormikState } from "formik";

import { StaticAttributs, FormValue } from "types/Types";

type FormProps = {
	manageBlur: boolean,
	initialValues: FormValue,
	staticAttributs: StaticAttributs,
	setOpening: (state: boolean) => void,
	onSubmit: (values: FormValue, { setSubmitting }: FormikHelpers<FormValue>) => void,
};

function Form({ initialValues, staticAttributs, manageBlur, setOpening, onSubmit }: FormProps) {
	const handleCancel = (resetForm: (nextState?: Partial<FormikState<FormValue>>) => void) => {
		setOpening(false);
		resetForm({ values: initialValues });
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ isSubmitting, resetForm, values }) => (
				<FormikForm className="flex flex-col">
					<Field
						as="textarea"
						name="fieldContent"
						className={staticAttributs.className}
						placeholder={staticAttributs.placeholder}
						onBlur={manageBlur ? (values.fieldContent ? undefined : () => handleCancel(resetForm)) : undefined}
						autoFocus
					/>
					<div className={`ml-${staticAttributs.styles.marginLeft} mb-${staticAttributs.styles.marginBottom}`}>
						<button type="submit" className="mr-2.5 text-white bg-cyan-400" disabled={isSubmitting}>Save</button>
						<button type="reset" onClick={() => handleCancel(resetForm)} className="text-neutral-600 bg-transparent hover:bg-stone-200">Cancel</button>
					</div>
				</FormikForm>
			)}
		</Formik>
	);
}

export default Form;
