import { IoMdClose } from "react-icons/io";

export default function MoveCard({ onClose }) {
    return (
        <div className="moveCard">
            <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>Move card</p>
            <IoMdClose className="closeMove" onClick={onClose} />
            <p style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '13px', marginBottom: '15px' }}>Select destination</p>
            <div style={{ backgroundColor: 'rgba(229, 229, 230, 0.772)', height: '70px', borderRadius: '5px', marginBottom: '10px' }}>
                <p style={{ padding: '10px', fontWeight: 'bold', fontSize: '13px' }}>List</p>
            </div>
            <div style={{ backgroundColor: 'rgba(229, 229, 230, 0.772)', height: '70px', borderRadius: '5px', marginBottom: '15px' }}>
                <p style={{ padding: '10px', fontWeight: 'bold', fontSize: '13px' }}>Position</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button style={{ marginRight: '10px' }} className="enable" onClick={() => {}}>Save</button>
            </div>
        </div>
    );
};
