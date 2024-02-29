import { useState, useContext } from "react";
import { ListContext } from "../../../utils/ListContext";
import { MdOutlineModeEditOutline } from "react-icons/md";

import CardOptions from "./CardOptions";

function Card({ card, listName, listIndex }) {
    const [cardTitle, setCardTitle] = useState(card.title);
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [showCardOptions, setShowCardOptions] = useState(false);

    const { lists, handleListEditing } = useContext(ListContext);

    const handleBlur = () => {
        if (!cardTitle.trim()) {
            setIsTitleEditing(false);
            setCardTitle(card.title);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (cardTitle.trim()) {
            const list = lists[listIndex];
            const newCard = {...card, title: cardTitle};
            const tmp = {
                ...list,
                cards: list.cards.map((object) => object.id === card.id ? newCard : object)
            };
    
            handleListEditing(listIndex, tmp);
            setIsTitleEditing(false);
        }
    };

    return (
        <div>
            {isTitleEditing ? (
                <form onSubmit={(event) => handleSubmit(event)}>
                    <textarea className="w-full h-[150px] p-[10px] mb-[3px] rounded-[7px] bg-white border border-b-[3px] border-[#b100f2]/30 border-b-[#6500F2]/[0.35]" id='cardEditing' name="cardEditing" value={cardTitle} onChange={(event) => { setCardTitle(event.target.value) }} onBlur={handleBlur} autoFocus />
                    <div className='mb-[10px]'>
                        <button type="submit" className="mr-[10px] text-white bg-[#01d2ee]">Save</button>
                        <button type="reset" onClick={() => { setIsTitleEditing(false); setCardTitle(card.title) }} className="text-[#4a4a4a] hover:bg-[#ECE9E9]">Cancel</button>
                    </div>
                </form>
            ) : (
                <p className="group flex items-center justify-between px-[10px] py-[5px] mb-[10px] rounded-[7px] border border-[#b100f2]/30 border-b-[3px] border-b-[#6500F2]/[0.35] cursor-pointer hover:border-[#40e0d0]/60 bg-white" onClick={() => setShowCardOptions(true)}>
                    <span className="w-[244px] white-space-pre-wrap break-words">{cardTitle}</span>
                    <MdOutlineModeEditOutline className="text-[2em] p-[8px] cursor-pointer rounded-full opacity-0 group-hover:opacity-100 hover:bg-[#E8E0EC]" onClick={(event) => { event.stopPropagation(); setIsTitleEditing(true) }} />
                </p>
            )}

            {showCardOptions ? <CardOptions listName={listName} card={card} onClose={() => { setShowCardOptions(false) }} /> : null}
        </div>
    );
}

export default Card;
