import React, { useState, useContext, KeyboardEvent, ChangeEvent } from "react";
import { GoKebabHorizontal } from "react-icons/go";

import ListActions from "./ListActions";
import AddCard from "./ManageCard/AddCard";
import AllCards from "./ManageCard/AllCards";

import { ListObject } from "types/Types";
import { ListContext } from "../../utils/ListContext";

function List({ list, index }: { list: ListObject, index: number }) {
	const [title, setTitle] = useState<string>(list.title);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [isListActions, setIsListActions] = useState<boolean>(false);
	const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);

	const { handleListEditing } = useContext(ListContext);

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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

	const handleTitleEditing = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleFormState = (state: boolean) => {
		setShowForm(state);
	};

	const handleClick = () => {
		if (isListActions)
			setIsListActions(false);
		else
			setIsListActions(true);
	};

	return (
		<div className="flex flex-col max-h-[89vh] z-10">

			<div className="flex items-center justify-between mb-3.5">
				{isTitleEditing ? (
					<input className="w-full h-8 px-2.5 mr-2 box-border bg-white outline-cyan-400" id="listEditing" name="listEditing" type="text" value={title} onChange={handleTitleEditing} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus></input>
				) : (
					<p className="w-full h-8 leading-8 px-2.5 truncate cursor-text" onClick={() => { setIsTitleEditing(true); }}>{list.title}</p>
				)}
				<GoKebabHorizontal className="text-4xl p-2 rounded hover:bg-teal-100/70" onClick={handleClick} />
			</div>

			{isListActions ? <ListActions onClose={() => setIsListActions(false)} /> : null}

			<AllCards list={list} listIndex={index} isFormVisible={showForm} setFormState={handleFormState} />
			<AddCard isFormVisible={showForm} setFormState={handleFormState} />

		</div>
	);
}

export default List;
