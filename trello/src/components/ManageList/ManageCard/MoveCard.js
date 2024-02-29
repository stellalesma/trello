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
        <div className="w-[280px] p-[10px] ml-[70px] mt-[5px] z-[10001] rounded-[7px] box-border fixed bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between mb-[25px]">
                <p className="font-bold w-full text-center">Move card</p>
                <IoMdClose className="text-[1.8em] p-[5px] rounded-full cursor-pointer hover:bg-[#E8E7E7]" onClick={onClose} />
            </div>

            <p className="font-bold text-sm mb-[15px]">Select destination</p>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col h-[80px] p-[10px] mb-[10px] rounded-[5px] bg-[#e5e5e6]/[0.77]">
                    <label htmlFor="dropDownList" className="font-bold text-sm">List</label>
                    <select id="dropDownList" name="dropDownList" value={selectedList} onChange={handleListChange} className="h-full">
                        {lists.map((list, _) => 
                            <option key={list.id} value={list.title}>{list.title}</option>
                        )}
                    </select>
                </div>

                <div className="flex flex-col h-[80px] p-[10px] mb-[15px] rounded-[5px] bg-[#e5e5e6]/[0.77]">
                    <label htmlFor="dropDownPosition" className="font-bold text-sm">Position</label>
                    <select id="dropDownPosition" name="dropDownPosition" value={selectedPosition} onChange={(e) => { setSelectedPosition(e.target.value) }} className="h-full">
                        {findAList(lists, selectedList).cards.map((card, index) => 
                            <option key={card.id} value={index + 1}>{index + 1}</option>
                        )}
                        {listName !== selectedList ? <option value={suggestedPosition}>{suggestedPosition}</option> : null}
                    </select>
                </div>

                <div className="flex w-full justify-center">
                    <button type='submit' className="text-white bg-[#01d2ee]">Save</button>
                </div>
            </form>

        </div>
    );
}
