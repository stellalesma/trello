import { useState } from "react";

import { IoMdClose } from "react-icons/io";

export default function MoveCard({ allLists, listName, card, onClose, onReorganize }) {
    const findAList = (allLists, searchedTitle) => {
        return allLists.find(objet => objet.title === searchedTitle);
    };
    
    const findCardsNb = (cards) => {
        return cards.length;
    };
    
    const findCardIndex = (cards, cardTitle) => {
        return cards.findIndex(objet => objet.title === cardTitle);
    };

    const currentList = findAList(allLists, listName);
    const [selectedList, setSelectedList] = useState(listName);
    const currentPosition = findCardIndex(currentList.cards, card.title) + 1;
    const [selectedPosition, setSelectedPosition] = useState(currentPosition);
    const suggestedPosition = findCardsNb(findAList(allLists, selectedList).cards) + 1;

    const handleSubmit = (e) => {
        e.preventDefault();
        const chosenList = findAList(allLists, selectedList);

        if (listName !== selectedList) {
            currentList.cards.splice(currentPosition - 1, 1);
            chosenList.cards.splice(selectedPosition - 1, 0, card);
        } else if (listName === selectedList && currentPosition !== selectedPosition) {
            currentList.cards.splice(currentPosition - 1, 1);
            currentList.cards.splice(selectedPosition - 1, 0, card);
        }
        
        onReorganize(allLists);
        onClose();
    };

    return (
        <div className="moveCard">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                <p style={{ fontWeight: 'bold' }}>Move card</p>
                <IoMdClose className="closeMove" onClick={onClose} />
            </div>

            <p style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '13px', marginBottom: '15px' }}>Select destination</p>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(229, 229, 230, 0.772)', height: '70px', padding: '10px', borderRadius: '5px', marginBottom: '10px', cursor: 'pointer' }}>
                    <label htmlFor="dropDownList" style={{ fontWeight: 'bold', fontSize: '13px' }}>List</label>
                    <select id="dropDownList" name="dropDownList" value={selectedList} onChange={(e) => { setSelectedList(e.target.value) }} className="dropDown">
                        {allLists.map((list, index) => 
                            <option key={index} value={list.title}>{list.title}</option>
                        )}
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(229, 229, 230, 0.772)', height: '70px', padding: '10px', borderRadius: '5px', marginBottom: '10px', cursor: 'pointer' }}>
                    <label htmlFor="dropDownPosition" style={{ fontWeight: 'bold', fontSize: '13px' }}>Position</label>
                    <select id="dropDownPosition" name="dropDownPosition" value={selectedPosition} onChange={(e) => { setSelectedPosition(e.target.value) }} className="dropDown">
                        {findAList(allLists, selectedList).cards.map((_, index) => 
                            <option key={index} value={index + 1}>{index + 1}</option>
                        )}
                        <option value={suggestedPosition}>{suggestedPosition}</option>
                    </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <button type='submit' style={{ marginRight: '10px' }} className="enable">Save</button>
                </div>
            </form>

        </div>
    );
}
