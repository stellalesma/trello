import React, { MouseEvent } from "react";
import { IoCardOutline, IoCloseOutline } from "react-icons/io5";

import CardActions from "./CardActions";
import { CardObject } from "types/Types";
import DescriptionActivities from "./DescriptionActivities";

type CardOptionsProps = {
	card: CardObject,
	listName: string,
	onClose: () => void,
}

function CardOptions ({ listName, card, onClose }: CardOptionsProps) {
	const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		if (!target.closest(".transition-spacing")) {
			onClose();
		}
	};

	const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	return (
		<div className="top-0 left-0 w-full h-full z-30 fixed bg-stone-900/50" onClick={handleClickOutside}>
			<div className="top-1/2 left-1/2 w-[90vw] sm:w-112.5 h-[90vh] p-5 md:w-185 transition-spacing -translate-x-2/4 -translate-y-2/4 fixed overflow-y-auto rounded-xl box-border bg-neutral-100" onClick={handleModalClick}>
				<div className="flex items-center justify-between">
					<div className="flex items-center text-xl">
						<IoCardOutline className="mr-2.5 text-3xl" />
						<p title={card.title} className="grow sm:w-75 md:w-152.5 font-bold cursor-text truncate">{card.title}</p>
					</div>
					<IoCloseOutline className="text-4xl p-2 rounded-full cursor-pointer hover:bg-stone-200" onClick={onClose} />
				</div>
				<p className="grow sm:w-64 md:w-112.5 ml-10 mb-10 text-sm truncate">in list <span title={listName} className="underline cursor-pointer">{listName}</span></p>

				<div className="flex flex-col md:flex-row">
					<DescriptionActivities card={card} />
					<CardActions card={card} listName={listName} onMainClose={onClose} />
				</div>

			</div>
		</div>
	);
};

export default CardOptions;
