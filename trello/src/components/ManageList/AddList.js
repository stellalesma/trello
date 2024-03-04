import React from "react";

import { useState, useContext } from "react";
import { ListContext } from "../../utils/ListContext";

import { FaPlus } from "react-icons/fa6";

function AddList() {
	const [listTitle, setListTitle] = useState("");
	const [showForm, setShowForm] = useState(false);
	const { updatedId, handleAddList } = useContext(ListContext);

	const handleTitle = (e) => {
		setListTitle(e.target.value);
	};

	const handleNoFocus = () => {
		if (!listTitle.trim()) {
			setShowForm(false);
			setListTitle("");   
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (listTitle.trim()) {
			handleAddList({ id: updatedId(), title: listTitle, cards: [] });
			setListTitle("");
			setShowForm(false);
		}
	};

	return (
		<div>
			{showForm ? (
				<form onSubmit={handleSubmit} className="w-75 p-2.5 rounded-lg bg-white">
					<input type="text" id="list" name="list" placeholder="Enter list title..." value={listTitle} onChange={handleTitle} onBlur={handleNoFocus} className="w-full h-9 p-2.5 mb-2.5 rounded box-border border outline-stone-300/70 focus:outline-cyan-400" autoFocus/>

					<div>
						<button type="submit" className="mr-2.5 text-white bg-cyan-400">Add list</button>
						<button type="reset" onClick={() => { setShowForm(false); setListTitle(""); }} className="text-neutral-600 hover:bg-stone-200">Cancel</button>
					</div>
				</form>
			) : (
				<p className="flex items-center w-75 h-12 pl-2.5 font-bold rounded-lg text-white bg-neutral-100/30 hover:bg-neutral-100/10  cursor-pointer" onClick={() => { setShowForm(true); }}>
					<FaPlus className="mr-1.5"/>
                    Add a list
				</p>
			)}
		</div>
	);
}

export default AddList;
