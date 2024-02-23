import { useState } from "react";
import { IoMdClose } from "react-icons/io";

function DeletionModal({modalName, text, right, onDelete, onClose}) {
    const [backgroundColor, setBackgroundColor] = useState("rgb(214, 2, 2)");

    const buttonStyle = {
        width: '100%',
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: backgroundColor,
    }

    return (
        <div className="deletionModal" style={{right: right}}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems : 'center', marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold', margin: 'auto' }}>{modalName}</p>
                <IoMdClose className="closeButton" onClick={onClose} />
            </div>
            <p style={{ lineHeight: '1.5', marginBottom: '20px' }}>{text}</p>
            <button style={buttonStyle} onMouseOver={() => setBackgroundColor('rgb(184, 2, 2)')} onMouseOut={() => setBackgroundColor("rgb(214, 2, 2)")} onClick={onDelete}>Delete</button>
        </div>
    );
}

export default DeletionModal;
