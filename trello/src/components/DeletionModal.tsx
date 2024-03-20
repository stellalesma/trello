import React from "react";
import { IoMdClose } from "react-icons/io";

type DeletionModalProps = {
	text: string,
	className: string,
	modalName: string,
	onClose: () => void,
	onDelete: () => void,
}

function DeletionModal ({modalName, text, className, onDelete, onClose}: DeletionModalProps) {
	return (
		<div className="relative">
			<div className={className}>
				<div className="flex flex-row items-center mb-5">
					<p className="font-bold m-auto">{modalName}</p>
					<IoMdClose className="text-3xl p-1 cursor-pointer rounded-full hover:bg-stone-200" onClick={onClose} />
				</div>
				<p className="leading-6 mb-5">{text}</p>
				<button className="w-full text-white font-bold bg-red-600 hover:bg-red-700" onClick={onDelete}>Delete</button>
			</div>
		</div>
	);
}

export default DeletionModal;
