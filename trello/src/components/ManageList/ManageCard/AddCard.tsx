import React from "react";
import { FaPlus } from "react-icons/fa6";

type AddCardProps = {
	isFormVisible: boolean,
	setFormState: (state: boolean) => void,
}

function AddCard({ isFormVisible, setFormState }: AddCardProps) {
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

export default AddCard;
