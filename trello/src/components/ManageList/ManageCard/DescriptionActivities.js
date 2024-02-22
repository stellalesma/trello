import { useState, useContext } from "react";
import { ListContext } from "../../../utils/ListContext";
import { IoMenuOutline, IoListOutline } from "react-icons/io5";

import Form from "../../Form";
import AllActivities from "./AllActivities";

function DescriptionActivities({ card }) {
    const [activity, setActivity] = useState("");
    const [description, setDescription] = useState(card.description);
    const [isActivityEditing, setIsActivityEditing] = useState(false);
    const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

    const { updatedId, lists, handleModifiedLists } = useContext(ListContext);

    const descriptionAttrs = {
        id: "descriptionEditing",
        name: "descriptionEditing",
        className: "description inputsDA",
        placeholder: "Add a more detailed description...",
        styles: {
            height: "120px",
            marginLeft: '34px',
            marginBottom: "40px",
        },
    };

    const activityAttrs = {
        id: "activityEditing",
        name: "activityEditing",
        className: "activity inputsDA",
        placeholder: "Write a comment...",
        styles: {
            height: "70px",
            marginLeft: '34px',
            marginBottom: "20px",
        },
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleActivity = (e) => {
        setActivity(e.target.value);
    };

    const handleDescriptionReset = () => {
        setIsDescriptionEditing(false);
        setDescription(card.description);
    };

    const handleActivityReset = () => {
        setIsActivityEditing(false);
        setActivity("");
    };

    const handleDescriptionSubmit = (e) => {
        e.preventDefault();

        const getNewCards = (list) => {
            return list.cards.map((object) => object.id === card.id ? {...object, description: description} : object);
        };
        const newLists = lists.map((list) => list.id === card.listId ? {...list, cards: getNewCards(list)} : list);

        handleModifiedLists(newLists);
        setIsDescriptionEditing(false);
    };


    const handleActivitySubmit = (e) => {
        e.preventDefault();

        const newActivity = {listId: card.listId, cardId: card.id, id: updatedId(), comment: activity};
        const getNewCards = (list) => {
            return list.cards.map((object) => object.id === card.id ? {...object, activities: [newActivity, ...object.activities]} : object);
        };
        const newLists = lists.map((list) => list.id === card.listId ? {...list, cards: getNewCards(list)} : list); 

        handleModifiedLists(newLists);
        setIsActivityEditing(false);
        setActivity("");
    };

    return (
        <div style={{ width: "550px", marginRight: "10px" }}>
            <div className="optionsOthers">
                <IoMenuOutline style={{ marginRight: "10px", fontSize: "1.2em" }} />
                <p>Description</p>
            </div>

            {isDescriptionEditing ? (
                <Form
                    value={description}
                    staticAttributs={descriptionAttrs}
                    onChange={handleDescription}
                    onClick={handleDescriptionReset}
                    onSubmit={handleDescriptionSubmit}
                />
            ) : (
                <p
                    className={description ? "description" : "description descriptionDefault"}
                    onClick={() => { setIsDescriptionEditing(true); }}
                >
                    {description ? description : "Add a more detailed description..."}
                </p>
            )}

            <div className="optionsOthers">
                <IoListOutline style={{ marginRight: "10px", fontSize: "1.2em" }} />
                <p>Activity</p>
            </div>

            {isActivityEditing ? (
                <Form
                    value={activity}
                    staticAttributs={activityAttrs}
                    onChange={handleActivity}
                    onClick={handleActivityReset}
                    onSubmit={handleActivitySubmit}
                    onBlur={() => !activity.trim() && handleActivityReset()}
                />
            ) : (
                <p className="activity" onClick={() => { setIsActivityEditing(true); }}>
                    Write a comment...
                </p>
            )}

            <AllActivities activities={card.activities} />
        </div>
    );
}

export default DescriptionActivities;
