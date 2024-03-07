import React from "react";

import PropTypes from "prop-types";

import { IoCardOutline, IoCloseOutline } from "react-icons/io5";

import CardActions from "./CardActions";
import DescriptionActivities from "./DescriptionActivities";

function CardOptions ({ listName, card, onClose }) {
	const handleClickOutside = (event) => {
		if (!event.target.closest(".modal")) {
			onClose();
		}
	};

	const handleModalClick = (event) => {
		event.stopPropagation();
	};

	return (
		<div className="top-0 left-0 w-full h-full z-10 absolute bg-stone-900/50" onClick={handleClickOutside}>
			<div className="top-1/2 left-1/2 w-185 h-175 p-5 -translate-x-2/4 -translate-y-2/4 absolute overflow-y-auto rounded-xl box-border bg-neutral-100" onClick={handleModalClick}>
				<div className="flex items-center justify-between">
					<div className="flex items-center text-xl">
						<IoCardOutline className="mr-2.5 text-3xl" />
						<p title={card.title} className="w-152.5 font-bold cursor-text truncate">{card.title}</p>
					</div>
					<IoCloseOutline className="text-4xl p-2 rounded-full cursor-pointer hover:bg-stone-200" onClick={onClose} />
				</div>
				<p className="w-112.5 ml-10 mb-10 text-sm truncate">in list <span title={listName} className="underline cursor-pointer">{listName}</span></p>

				<div className="flex">
					<DescriptionActivities card={card} />
					<CardActions card={card} listName={listName} onMainClose={onClose} />
				</div>

			</div>
		</div>
	);
};

CardOptions.propTypes = {
	card: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	listName: PropTypes.string.isRequired,
};

export default CardOptions;
