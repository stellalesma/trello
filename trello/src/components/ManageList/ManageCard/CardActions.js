import { useState, useContext } from "react";
import { RxDash } from "react-icons/rx";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ListContext } from "../../../utils/ListContext";

import MoveCard from "./MoveCard";
import DeletionModal from "../../DeletionModal";

function CardActions({ card, listName, onMainClose }) {
    const [isMoveCardVisible, setIsMoveCardVisible] = useState(false);
    const [isDeleteCardVisible, setIsDeleteCardVisible] = useState(false);

    const { lists, handleListEditing } = useContext(ListContext);

    const deletionWarning = "All actions will be removed from the activity feed and you won't be able to reopen the card. There is no undo.";

    const handleDelete = () => {
        const listIndex = lists.findIndex((list) => list.id === card.listId);
        const newList = {
            ...lists[listIndex],
            cards: lists[listIndex].cards.filter((object) => object.id !== card.id),
        }

        handleListEditing(listIndex, newList);
        setIsDeleteCardVisible(false);
        onMainClose();
    };

    return (
        <div>
            <p className="actions">Actions</p>
            <p className="actionsList" onClick={() => { setIsMoveCardVisible(true) }}>
                <IoIosArrowRoundForward style={{ marginRight: '10px', fontSize: '1.2em' }} />
                Move
            </p>
            {isMoveCardVisible ? <MoveCard listName={listName} card={card} onClose={() => { setIsMoveCardVisible(false) }} onMainClose={onMainClose} /> : null}
            <p className="actionsList" onClick={() => { setIsDeleteCardVisible(true) }}>
                <RxDash style={{ marginRight: '10px', fontSize: '1.2em' }} />
                Delete
            </p>
            {isDeleteCardVisible ? <DeletionModal modalName="Delete card ?" text={deletionWarning} right='-200px' onDelete={handleDelete} onClose={() => { setIsDeleteCardVisible(false) }} /> : null}
        </div>
    );
}

export default CardActions;
