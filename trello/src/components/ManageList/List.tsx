import React, { useState, KeyboardEvent, ChangeEvent, useContext } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";

import axios from "axios";

import ListActions from "./ListActions";
import AllCards from "./ManageCard/AllCards";

import { ListObject } from "../../types/Types";
import { ListContext } from "../../utils/ListContext";
import { useAccessToken } from "../../utils/AccessTokenContext";

function List({ list }: { list: ListObject }) {
	const { config } = useAccessToken();
	const { lists, updateLists } = useContext(ListContext);

	const [title, setTitle] = useState<string>(list.title);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [isListActions, setIsListActions] = useState<boolean>(false);
	const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);

	const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			if (title.trim()) {
				await axios.put(`http://localhost:8081/task-list/${list.id}`, {...list, title: title}, config)
					.then(() => {
						const newLists = lists.map(item => item.id === list.id ? {...item, title: title} : item);
						updateLists(newLists);
						setIsTitleEditing(false);
					})
					.catch((error) => console.error("Error updating list :", error));			}
		}
	};

	const handleBlur = async () => {
		if (!title.trim()) {
			setIsTitleEditing(false);
			setTitle(list.title);
		} else {
			await axios.put(`http://localhost:8081/task-list/${list.id}`, {...list, title: title}, config)
				.then(() => {
					const newLists = lists.map(item => item.id === list.id ? {...item, title: title} : item);
					updateLists(newLists);
					setIsTitleEditing(false);
				})
				.catch((error) => console.error("Error updating list :", error));
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

			{isListActions ? <ListActions setFormState={handleFormState} onClose={() => setIsListActions(false)} /> : null}

			<AllCards list={list} isFormVisible={showForm} setFormState={handleFormState} />

			{!showForm ? (
				<p className="flex items-center p-2.5 mt-5 rounded cursor-pointer hover:bg-pink-100/60" onClick={() => setShowForm(true)}>
					<FaPlus className="mr-1.5" />
                    Add a card
				</p>
			) : null}

		</div>
	);
}

export default List;
