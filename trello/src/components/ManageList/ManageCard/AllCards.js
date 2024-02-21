import { useState } from "react";
// import { ListContext } from "../../../utils/ListContext"

import Card from "./Card";
import CardOptions from "./CardOptions";

function AllCards({ list, onCardEditing }) {
    const [isCardOptions, setIsCardOptions] = useState(false);
    const [modalCard, setModalCard] = useState(null);

    const handleAddDescription = (card, newDescription) => {
        let tmp = card;
        tmp.description = newDescription;
    };

    const handleAddActivity = (card, newActivity) => {
        let tmp = card;
        tmp.activities.unshift(newActivity);
    }

    return (
        <ul>
            {list.cards.map((card, index) =>
                <div key={card.title}>
                    <li>
                        <Card card={card} id={index} onCardEditing={onCardEditing} onCardOptions={(mCard) => { setModalCard(mCard); setIsCardOptions(true) }} />
                    </li>

                    {isCardOptions ? <CardOptions listName={list.title} card={modalCard} onAddDescription={(description) => handleAddDescription(modalCard, description)} onAddActivity={(activity) => handleAddActivity(modalCard, activity)} onClose={() => { setIsCardOptions(false) }} /> : null}
                </div>
            )}
        </ul>
    );
}

export default AllCards;

// function AllCards({ listName, onCardEditing }) {
//     const [isCardOptions, setIsCardOptions] = useState(false);
//     const [modalCard, setModalCard] = useState(null);
//     const { lists } = useContext(ListContext);

//     const findAList = (lists, searchedTitle) => {
//         return lists.find(objet => objet.title === searchedTitle);
//     };
    
//     const list = findAList(lists, listName);

//     const handleAddDescription = (card, newDescription) => {
//         let tmp = card;
//         tmp.description = newDescription;
//     };

//     const handleAddActivity = (card, newActivity) => {
//         let tmp = card;
//         tmp.activities.unshift(newActivity);
//     }

//     return (
//         <ul>
//             {list.cards.map((card, index) =>
//                 <div key={card.title}>
//                     <li>
//                         <Card card={card} id={index} onCardEditing={onCardEditing} onCardOptions={(mCard) => { setModalCard(mCard); setIsCardOptions(true) }} />
//                     </li>

//                     {isCardOptions ? <CardOptions listName={listName} card={modalCard} onAddDescription={(description) => handleAddDescription(modalCard, description)} onAddActivity={(activity) => handleAddActivity(modalCard, activity)} onClose={() => { setIsCardOptions(false) }} /> : null}
//                 </div>
//             )}
//         </ul>
//     );
// }

// export default AllCards;
