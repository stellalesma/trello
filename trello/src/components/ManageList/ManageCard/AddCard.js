import React from "react";

import { FaPlus } from "react-icons/fa6";

import PropTypes from "prop-types";

function AddCard({ isFormVisible, setFormState }) {
	return (
		<div>
			{!isFormVisible ? (
				<p className="flex items-center p-2.5 mt-5 rounded cursor-pointer hover:bg-pink-100/60" onClick={() => setFormState(true)}>
					<FaPlus className="mr-1.5" />
                    Add a card
				</p>
			) : null}
		</div>
	);
}

AddCard.propTypes = {
	setFormState: PropTypes.func.isRequired,
	isFormVisible: PropTypes.bool.isRequired,
};

export default AddCard;
