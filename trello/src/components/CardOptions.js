import { useState } from "react";

import { IoCardOutline, IoCloseOutline, IoMenuOutline, IoListOutline } from "react-icons/io5";
import { IoIosArrowRoundForward, IoMdContact } from "react-icons/io";

import MoveCard from "./MoveCard";

function CardOptions ({ listName, card, onAddDescription, onAddActivity, onClose }) {
    const [activity, setActivity] = useState("");
    const [isActivityEditing, setIsActivityEditing] = useState(false);
    const [description, setDescription] = useState(card.description);
    const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
    const [isMoveCard, setIsMoveCard] = useState(false);

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleActivity = (e) => {
        setActivity(e.target.value);
    };

    const handleDescriptionSubmit = (e) => {
        e.preventDefault();
        onAddDescription(description);
        setIsDescriptionEditing(false);
    };

    const handleActivitySubmit = (e) => {
        e.preventDefault();
        onAddActivity(activity);
        setIsActivityEditing(false);
        setActivity("");
    };

    const displayActivities = card.activities.map((activity, index) =>
        <div key={index}>
            <div style={{ display: 'flex' }}>
                <IoMdContact style={{ marginRight: '5px', fontSize: '1.9em' }} />
                <li key={index} className="activities">
                    {activity}
                </li>
            </div>
            <p style={{ fontSize: '12px', marginLeft: '34px', marginBottom: '20px' }}>
                <span style={{ textDecoration: 'underline' }}>Edit</span> . <span style={{ textDecoration: 'underline' }}>Delete</span>
            </p>
        </div>
    );

    return (
        <div className="overlay">
            <div className="modal">

                <div className="optionsTitle">
                    <IoCardOutline style={{ marginRight: '10px', fontSize: '1.3em' }} />
                    <p style={{ width: 700 }}>{card.title}</p>
                    <IoCloseOutline style={{ fontSize: '1.5em' }} onClick={onClose} />
                </div>
                <p style={{ marginLeft: '34px', marginBottom: '40px' }}>in list <span style={{ textDecoration: 'underline' }}>{listName}</span></p>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '550px', marginRight: '10px' }}>

                        <div className="optionsOthers">
                            <IoMenuOutline style={{ marginRight: '10px', fontSize: '1.2em' }} />
                            <p>Description</p>
                        </div>

                        {isDescriptionEditing ? (
                            <form onSubmit={handleDescriptionSubmit}>
                                <textarea id="descriptionEditing" name="descriptionEditing" className="description inputsDA" style={{ height: '120px' }} placeholder="Add a more detailed description..." value={description} onChange={handleDescription} autoFocus />
                                <div style={{ marginLeft: '34px', marginBottom: '40px' }}>
                                    <button type="submit" style={{ marginRight: '10px' }} className="enable">Save</button>
                                    <button type="reset" onClick={() => { setIsDescriptionEditing(false); setDescription(card.description) }} className="disable">Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <p className={description ? "description" : "description descriptionDefault"} onClick={() => { setIsDescriptionEditing(true) }}>{description ? description : "Add a more detailed description..."}</p>
                        )}

                        <div className="optionsOthers">
                            <IoListOutline style={{ marginRight: '10px', fontSize: '1.2em' }} />
                            <p>Activity</p>
                        </div>

                        {isActivityEditing ? (
                            <form onSubmit={handleActivitySubmit}>
                                <textarea id="activityEditing" name="activityEditing" className="activity inputsDA" style={{ height: '70px' }} placeholder="Write a comment..." value={activity} onChange={handleActivity} autoFocus />
                                <div style={{ marginLeft: '34px', marginBottom: '20px' }}>
                                    <button type="submit" style={{ marginRight: '10px' }} className="enable">Save</button>
                                    <button type="reset" onClick={() => { setIsActivityEditing(false); setActivity("") }} className="disable">Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <p className="activity" onClick={() => { setIsActivityEditing(true) }}>Write a comment...</p>
                        )}

                        <ul>{displayActivities}</ul>

                    </div>

                    <div>
                        <p className="actions">Actions</p>
                        <p className="actionsList" onClick={() => { setIsMoveCard(true) }}>
                            <IoIosArrowRoundForward style={{ marginRight: '10px', fontSize: '1.2em'}}/>
                            Move
                        </p>

                        {isMoveCard ? <MoveCard onClose={() => { setIsMoveCard(false) }} /> : null}

                    </div>

                </div>

            </div>
        </div>
    );
};

export default CardOptions;
