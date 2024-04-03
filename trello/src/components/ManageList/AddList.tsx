import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { FaPlus } from "react-icons/fa6";

import axios from "axios";

import { ListContext } from "../../utils/ListContext";
import { useAccessToken } from "../../utils/AccessTokenContext";

function AddList() {
	const { config } = useAccessToken();
	const { userId, lists, updateLists } = useContext(ListContext);

	const [listTitle, setListTitle] = useState<string>("");
	const [showForm, setShowForm] = useState<boolean>(false);

	const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setListTitle(e.target.value);
	};

	const handleNoFocus = () => {
		if (!listTitle.trim()) {
			setShowForm(false);
			setListTitle("");   
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (listTitle.trim()) {
			const newList = {title: listTitle};
			const maxId = lists.reduce((max, list) => list.id > max ? list.id : max, 0);
			const localList = {id: maxId + 1, title: listTitle, owner_id: userId};

			await axios.post("http://localhost:8081/task-list", newList, config)
				.then(() => {
					updateLists([...lists, localList]);
					setListTitle("");
					setShowForm(false);
				})
				.catch((error) => {
					console.error("Error adding list :", error);
				});
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
