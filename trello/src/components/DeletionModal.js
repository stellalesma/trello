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
        <div className="w-[320px] p-[10px] mt-[5px] flex z-[10002] fixed rounded-[10px] box-border flex-col bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]" style={{right: right}}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems : 'center', marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold', margin: 'auto' }}>{modalName}</p>
                <IoMdClose className="text-[1.8em] p-[5px] cursor-pointer rounded-full hover:bg-[#E8E7E7]" onClick={onClose} />
            </div>
            <p style={{ lineHeight: '1.5', marginBottom: '20px' }}>{text}</p>
            <button style={buttonStyle} onMouseOver={() => setBackgroundColor('rgb(184, 2, 2)')} onMouseOut={() => setBackgroundColor("rgb(214, 2, 2)")} onClick={onDelete}>Delete</button>
        </div>
    );
}

export default DeletionModal;
