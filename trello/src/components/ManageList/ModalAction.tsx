import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";

type ModalActionProps = {
    modalName: string,
    children: ReactNode,
    setAnything: (state: boolean) => void,
    onClose: (event: React.MouseEvent<SVGElement, MouseEvent>) => void,
};

export default function ModalAction({ children, modalName, setAnything, onClose }: ModalActionProps) {
	const handleBack = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
		event.stopPropagation();
		setAnything(false);
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-3.5 px-2">
				<IoChevronBackOutline className="text-3xl p-1.5 rounded cursor-pointer hover:bg-teal-100/70" onClick={handleBack} />
				<p className="w-full font-bold text-center">{modalName}</p>
				<IoMdClose className="text-3xl p-1.5 rounded cursor-pointer hover:bg-teal-100/70" onClick={onClose} />
			</div>
			
			{children}
		</div>
	);
}
