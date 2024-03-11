import React, { useState, useContext } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";

import PropTypes from "prop-types";

import ListActions from "./ListActions";
import AllCards from "./ManageCard/AllCards";
import { ListContext } from "../../utils/ListContext";

function List({ list, index }) {
	const [title, setTitle] = useState(list.title);
	const [showForm, setShowForm] = useState(false);
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

	const handleFormState = (state) => {
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

			{isListActions ? <ListActions setFormState={handleFormState} onClose={() => setIsListActions(false)} /> : null}

			<AllCards list={list} listIndex={index} isFormVisible={showForm} setFormState={handleFormState} />

			{!showForm ? (
				<p className="flex items-center p-2.5 mt-5 rounded cursor-pointer hover:bg-pink-100/60" onClick={() => setShowForm(true)}>
					<FaPlus className="mr-1.5" />
                    Add a card
				</p>
			) : null}

		</div>
	);
}

List.propTypes = {
	list: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

export default List;
