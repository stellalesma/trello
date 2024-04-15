import React from "react";
import { IoMdClose } from "react-icons/io";

type ListActionsProps = {
	onClose: () => void,
	setFormState: (state: boolean) => void,
};

export default function ListActions({ setFormState, onClose }: ListActionsProps) {

	const handleAddCard = () => {
		onClose();
		setFormState(true);
	};

	return (
		<div className="relative">
			<div className="flex flex-col w-64 md:w-75 py-2.5 -top-2.5 right-0 rounded-lg absolute bg-white shadow-custom">
				<div className="flex items-center justify-between mb-3.5 pr-2.5">
					<p className="w-full font-bold text-center">List actions</p>
					<IoMdClose className="text-4xl p-2 rounded cursor-pointer hover:bg-teal-100/70" onClick={onClose} />
				</div>
				<p className="px-2.5 py-2 cursor-pointer hover:bg-pink-100/60" onClick={handleAddCard}>Add card</p>
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
		</div>
	);
}
