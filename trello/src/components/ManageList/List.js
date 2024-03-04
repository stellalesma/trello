import React from "react";

import { useState, useContext } from "react";
import { ListContext } from "../../utils/ListContext";

import { GoKebabHorizontal } from "react-icons/go";

import ListActions from "./ListActions";
import AddCard from "./ManageCard/AddCard";
import AllCards from "./ManageCard/AllCards";

function List({ list, index }) {
	const [title, setTitle] = useState(list.title);
	const [isListActions, setIsListActions] = useState(false);
	const [isTitleEditing, setIsTitleEditing] = useState(false);

	const { handleListEditing } = useContext(ListContext);

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			if (title.trim()) {
				handleListEditing(index, {...list, title: title});
				setIsTitleEditing(false);
			}
		}
	};

	const handleBlur = () => {
		if (!title.trim()) {
			setIsTitleEditing(false);
			setTitle(list.title);
		} else {
			handleListEditing(index, {...list, title: title});
			setIsTitleEditing(false);        
		}
	};

	const handleTitleEditing = (event) => {
		setTitle(event.target.value);
	};

	return (
		<div>

			<div className="flex items-center justify-between mb-3.5">
				{isTitleEditing ? (
					<input className="w-full h-8 px-2.5 mr-2 box-border bg-white outline-cyan-400" id="listEditing" name="listEditing" type="text" value={title} onChange={handleTitleEditing} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus></input>
				) : (
					<p className="w-full h-8 leading-8 px-2.5 truncate cursor-text" onClick={() => { setIsTitleEditing(true); }}>{list.title}</p>
				)}
				<GoKebabHorizontal className="text-4xl p-2 rounded hover:bg-teal-100/70" onClick={() => { setIsListActions(true); }} />
			</div>

			{isListActions ? <ListActions onClose={() => setIsListActions(false)} /> : null}

			<AllCards list={list} listIndex={index} />
			<AddCard list={list} listIndex={index} />

		</div>
	);
}

export default List;
