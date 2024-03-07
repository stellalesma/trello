import React from "react";

import PropTypes from "prop-types";

function Form({ value, staticAttributs, onBlur, onChange, onClick, onSubmit }) {
	return (
		<form onSubmit={onSubmit} className="flex flex-col">
			<textarea id={staticAttributs.id} name={staticAttributs.name} className={staticAttributs.className} placeholder={staticAttributs.placeholder} value={value} onChange={onChange} onBlur={onBlur} autoFocus />
			<div className={`ml-${staticAttributs.styles.marginLeft} mb-${staticAttributs.styles.marginBottom}`}>
				<button type="submit" className="mr-2.5 text-white bg-cyan-400">Save</button>
				<button type="reset" onClick={onClick} className="text-neutral-600 bg-transparent hover:bg-stone-200">Cancel</button>
			</div>
		</form>
	);
}

Form.propTypes = {
	onBlur: PropTypes.func,
	onClick: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	staticAttributs: PropTypes.object.isRequired,
};

export default Form;
