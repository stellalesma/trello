import { useState, useContext } from "react";
import { IoMdContact } from "react-icons/io";
import { ListContext } from "../../../utils/ListContext";

import Form from "../../Form";

function Activity ({ activity }) {
    const [isEdit, setIsEdit] = useState(false);
    const [comment, setComment] = useState(activity.comment);
    const { lists, handleListEditing, handleModifiedLists } = useContext(ListContext);

    const handleActivityDeleting = () => {
        const getNewActivities = (card) => card.activities.filter((act) => act.id !== activity.id);
        const getNewCards = (list) => list.cards.map((card) => card.id === activity.cardId ? {...card, activities: getNewActivities(card)} : card);
        const newLists = lists.map((list) => list.id === activity.listId ?  {...list, cards: getNewCards(list)} : list);

        handleModifiedLists(newLists);
    };

    const handleActivityEditing = () => {      // il faut optimiser cette fonction
        const listIndex = lists.findIndex((list) => list.id === activity.listId);
        const cards = lists[listIndex].cards;

        const cardIndex = cards.findIndex((card) => card.id === activity.cardId);
        const activities = cards[cardIndex].activities;

        const activityIndex = activities.findIndex((object) => object.id === activity.id);

        const newActivity = {...activities[activityIndex], comment: comment};
        const newActivities = [...activities];
        newActivities[activityIndex] = newActivity;

        const newCard = {...cards[cardIndex], activities: newActivities};
        const newCards = [...cards];
        newCards[cardIndex] = newCard;

        const newList = {...lists[listIndex], cards: newCards};
        handleListEditing(listIndex, newList);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (comment.trim()) {
            handleActivityEditing();
            setIsEdit(false);
        }
    };

    const handleCancel = () => {
        setIsEdit(false);
        setComment(activity.comment);
    };

    const activityAttrs = {
        id: "activityEdit",
        name: "activityEdit",
        className: "activities inputsDA",
        placeholder: "Write a comment...",
        styles: {
            height: "70px",
            marginBottom: "20px",
            marginLeft: '0px',
        },
    };

    return (
        <div>
            {isEdit ? (
                <div style={{ display: 'flex' }}>
                    <IoMdContact style={{ marginRight: '5px', fontSize: '1.9em' }} />
                    <Form
                        value={comment}
                        staticAttributs={activityAttrs}
                        onClick={handleCancel}
                        onSubmit={handleSubmit}
                        onChange={(e) => setComment(e.target.value)}
                        onBlur={() => !comment.trim() && handleCancel()}
                    />
                </div>
            ) : (
                <div>
                    <div style={{ display: 'flex' }}>
                        <IoMdContact style={{ marginRight: '5px', fontSize: '1.9em' }} />
                        <li className="activities">
                            {activity.comment}
                        </li>
                    </div>
                    <p style={{ fontSize: '12px', marginLeft: '34px', marginBottom: '20px' }}>
                        <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { setIsEdit(true)} }>Edit</span>
                        <span /> . <span />  
                        <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleActivityDeleting}>Delete</span>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Activity;
