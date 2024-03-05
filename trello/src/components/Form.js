import React from "react";

import PropTypes from "prop-types";

function Form({ value, staticAttributs, onBlur, onChange, onClick, onSubmit }) {
	return (
		<form onSubmit={onSubmit}>
			<textarea id={staticAttributs.id} name={staticAttributs.name} className={staticAttributs.className} placeholder={staticAttributs.placeholder} value={value} onChange={onChange} onBlur={onBlur} autoFocus />
			<div className={`ml-[${staticAttributs.styles.marginLeft}] mb-[${staticAttributs.styles.marginBottom}]`}>
				<button type="submit" className="mr-[10px] text-white bg-[#01d2ee]">Save</button>
				<button type="reset" onClick={onClick} className="text-[#4a4a4a] bg-transparent hover:bg-[#ece9e9]">Cancel</button>
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
