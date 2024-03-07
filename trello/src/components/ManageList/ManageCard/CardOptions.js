import React from "react";

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
		<div className="top-0 left-0 w-full h-full z-[9999] absolute bg-[#1d1d1d]/50" onClick={handleClickOutside}>
			<div className="top-1/2 left-1/2 w-[740px] h-[700px] p-[20px] -translate-x-[50%] -translate-y-[50%] absolute overflow-y-auto rounded-[12px] box-border bg-[#f5f5f5]" onClick={handleModalClick}>
				<div className="flex items-center justify-between">
					<div className="flex items-center text-xl">
						<IoCardOutline className="mr-[10px] text-[1.2em]" />
						<p title={card.title} className="w-[610px] font-bold cursor-text truncate">{card.title}</p>
					</div>
					<IoCloseOutline className="text-[2em] p-[5px] rounded-full cursor-pointer hover:bg-[#E8E7E7]" onClick={onClose} />
				</div>
				<p className="w-[450px] ml-[34px] mb-[40px] text-[14.7px] truncate">in list <span title={listName} className="underline cursor-pointer">{listName}</span></p>

				<div className="flex">
					<DescriptionActivities card={card} />
					<CardActions card={card} listName={listName} onMainClose={onClose} />
				</div>

			</div>
		</div>
	);
};

export default CardOptions;
