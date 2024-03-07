import React from "react";
import { IoMdClose } from "react-icons/io";

import PropTypes from "prop-types";

export default function ListActions({ onClose }) {
	return (
		<div className="w-75 py-2.5 -mt-2.5 ml-72 rounded-lg fixed bg-white shadow-custom">
			<div className="flex items-center justify-between mb-3.5 pr-2.5">
				<p className="w-full font-bold text-center">List actions</p>
				<IoMdClose className="text-4xl p-2 rounded cursor-pointer hover:bg-teal-100/70" onClick={onClose} />
			</div>
			<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Add card</p>
			<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Copy list</p>
			<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Move list</p>
			<hr />
			<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Sort by...</p>
			<hr />
			<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Move all cards in the list</p>
			<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Delete all cards in the list</p>
			<hr />
			<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60">Delete this list</p>
		</div>
	);
}

ListActions.propTypes = {
	onClose: PropTypes.func.isRequired,
};
