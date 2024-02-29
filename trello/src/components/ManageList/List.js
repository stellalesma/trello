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
        if (event.key === 'Enter') {
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

            <div className="flex items-center justify-between mb-[15px]">
                {isTitleEditing ? (
                    <input className="w-full h-[30px] px-[10px] mr-[8px] box-border bg-white outline-[#01d2ee]" id="listEditing" name="listEditing" type="text" value={title} onChange={handleTitleEditing} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus></input>
                ) : (
                    <p className="w-full h-[30px] leading-[30px] px-[10px] truncate cursor-text" onClick={() => { setIsTitleEditing(true) }}>{list.title}</p>
                )}
                <GoKebabHorizontal className="text-[2em] p-[7px] rounded-[5px] hover:bg-[#DFECEE]" onClick={() => { setIsListActions(true) }} />
            </div>

            {isListActions ? <ListActions onClose={() => setIsListActions(false)} /> : null}

            <AllCards list={list} listIndex={index} />
            <AddCard list={list} listIndex={index} />

        </div>
    );
}

export default List;
