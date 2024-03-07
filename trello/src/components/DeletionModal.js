import React from "react";
import { IoMdClose } from "react-icons/io";

import PropTypes from "prop-types";

function DeletionModal({modalName, text, onDelete, onClose}) {

	return (
		<div className="w-80 p-2.5 mt-1.5 flex z-30 fixed rounded-lg box-border flex-col bg-white shadow-custom">
			<div className="flex flex-row items-center mb-5">
				<p className="font-bold m-auto">{modalName}</p>
				<IoMdClose className="text-3xl p-1 cursor-pointer rounded-full hover:bg-stone-200" onClick={onClose} />
			</div>
			<p className="leading-6 mb-5">{text}</p>
			<button className="w-full text-white font-bold bg-red-600 hover:bg-red-700" onClick={onDelete}>Delete</button>
		</div>
	);
}

DeletionModal.propTypes = {
	text: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	modalName: PropTypes.string.isRequired,
};

export default DeletionModal;
