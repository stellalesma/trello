import { useState, useContext } from "react";
import { ListContext } from "../../../utils/ListContext"

import { IoMdClose } from "react-icons/io";

export default function MoveCard({ listName, card, onClose, onMainClose }) {
    const { lists, handleModifiedLists } = useContext(ListContext);

    const findAList = (lists, searchedTitle) => {
        return lists.find(object => object.title === searchedTitle);
    };

    const findCardsNb = (cards) => {
        return cards.length;
    };

    const findCardIndex = (cards, cardTitle) => {
        return cards.findIndex(object => object.title === cardTitle);
    };

    const currentList = findAList(lists, listName);
    const [selectedList, setSelectedList] = useState(listName);
    const currentPosition = findCardIndex(currentList.cards, card.title) + 1;
    const [selectedPosition, setSelectedPosition] = useState(currentPosition);
    const suggestedPosition = findCardsNb(findAList(lists, selectedList).cards) + 1;

    const handleListChange = (e) => {
        setSelectedList(e.target.value);
        setSelectedPosition(listName !== e.target.value ? findCardsNb(findAList(lists, e.target.value).cards) + 1 : currentPosition);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentList = findAList(lists, listName);
        const chosenList = findAList(lists, selectedList);

        if (listName !== selectedList) {
            currentList.cards.splice(currentPosition - 1, 1);
            chosenList.cards.splice(selectedPosition - 1, 0, card);
        } else if (listName === selectedList && currentPosition !== selectedPosition) {
            currentList.cards.splice(currentPosition - 1, 1);
            currentList.cards.splice(selectedPosition - 1, 0, card);
        }

        handleModifiedLists([...lists]);
        onClose();
        onMainClose();
    };

    return (
        <div className="moveCard">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                <p style={{ fontWeight: 'bold', margin: 'auto' }}>Move card</p>
                <IoMdClose className="closeButton" onClick={onClose} />
            </div>

            <p style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '13px', marginBottom: '15px' }}>Select destination</p>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(229, 229, 230, 0.772)', height: '70px', padding: '10px', borderRadius: '5px', marginBottom: '10px', cursor: 'pointer' }}>
                    <label htmlFor="dropDownList" style={{ fontWeight: 'bold', fontSize: '13px' }}>List</label>
                    <select id="dropDownList" name="dropDownList" value={selectedList} onChange={handleListChange} className="dropDown">
                        {lists.map((list, _) => 
                            <option key={list.id} value={list.title}>{list.title}</option>
                        )}
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(229, 229, 230, 0.772)', height: '70px', padding: '10px', borderRadius: '5px', marginBottom: '10px', cursor: 'pointer' }}>
                    <label htmlFor="dropDownPosition" style={{ fontWeight: 'bold', fontSize: '13px' }}>Position</label>
                    <select id="dropDownPosition" name="dropDownPosition" value={selectedPosition} onChange={(e) => { setSelectedPosition(e.target.value) }} className="dropDown">
                        {findAList(lists, selectedList).cards.map((card, index) => 
                            <option key={card.id} value={index + 1}>{index + 1}</option>
                        )}
                        {listName !== selectedList ? <option value={suggestedPosition}>{suggestedPosition}</option> : null}
                    </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <button type='submit' style={{ marginRight: '10px' }} className="enable">Save</button>
                </div>
            </form>

        </div>
    );
}
