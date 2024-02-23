import { IoMdClose } from "react-icons/io";

export default function ListActions({ onClose }) {
    return (
        <div className="listActions">
           <div style={{ display: 'flex', flexDirection: 'row', alignItems : 'center', margin: '10px', marginBottom: '15px' }}>
                <p style={{ fontWeight: 'bold', margin: 'auto' }}>List actions</p>
                <IoMdClose className="closeButton" onClick={onClose} />
            </div>
            <p className="listActionsItems">Add card</p>
            <p className="listActionsItems">Copy list</p>
            <p className="listActionsItems">Move list</p>
            <hr />
            <p className="listActionsItems">Sort by...</p>
            <hr />
            <p className="listActionsItems">Move all cards in the list</p>
            <p className="listActionsItems">Delete all cards in the list</p>
            <hr />
            <p className="listActionsItems">Delete this list</p>
        </div>
    );
}
