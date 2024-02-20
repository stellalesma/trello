import { IoCardOutline, IoCloseOutline } from "react-icons/io5";

import CardActions from "./CardActions";
import DescriptionActivities from "./DescriptionActivities";

function CardOptions ({ listName, card, onAddDescription, onAddActivity, onClose }) {
    const handleClickOutside = (event) => {
        if (!event.target.closest(".modal")) {
            onClose();
        }
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="overlay" onClick={handleClickOutside}>
            <div className="modal" onClick={handleModalClick}>

                <div className="optionsTitle">
                    <IoCardOutline style={{ marginRight: '10px', fontSize: '1.3em' }} />
                    <p style={{ width: 700, cursor: 'text' }}>{card.title}</p>
                    <IoCloseOutline style={{ fontSize: '1.5em', cursor: 'pointer' }} onClick={onClose} />
                </div>
                <p style={{ marginLeft: '34px', marginBottom: '40px' }}>in list <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{listName}</span></p>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <DescriptionActivities card={card} onAddDescription={onAddDescription} onAddActivity={onAddActivity} />
                    <CardActions card={card} listName={listName} />
                </div>

            </div>
        </div>
    );
};

export default CardOptions;
