import { useState } from "react";

import { GoKebabHorizontal } from "react-icons/go";

import AddCard from "./AddCard";
import AllCards from "./AllCards";

function List({ currentList, id, onListEditing }) {
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [list, setList] = useState(currentList);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsTitleEditing(false);
        }
    };

    const handleTitleEditing = (event) => {
        let tmp = list;
        tmp.title = event.target.value;
        onListEditing(id, setList(tmp));
    };

    const handleAddCard = (newCard) => {
        let tmp = list;
		tmp.cards.push(newCard);
        onListEditing(id, setList(tmp));
	};

    const handleCardEditing = (id, newCard) => {
        let tmp = list;
		tmp.cards[id] = newCard;
        onListEditing(id, setList(tmp));
    }

    return (
        <div>

            <div style={{display: 'flex'}}>
                {isTitleEditing ? (
                    <input className="titleEditing" id="listEditing" name="listEditing" type="text" value={list.title} onChange={handleTitleEditing} onBlur={() => { setIsTitleEditing(false) }} onKeyDown={handleKeyDown} autoFocus></input>
                ) : (
                    <p className="titleEditing" onClick={() => { setIsTitleEditing(true) }}>{list.title}</p>
                )}
                <GoKebabHorizontal className="listMenu"/>
            </div>

            <AllCards listName={list.title} cards={list.cards} onCardEditing={handleCardEditing} />
            <AddCard onAddCard={handleAddCard} />

        </div>
    );
}

export default List;
