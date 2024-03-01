import { IoMdClose } from "react-icons/io";

function DeletionModal({modalName, text, onDelete, onClose}) {

    return (
        <div className="w-[320px] p-[10px] mt-[5px] flex z-[10002] fixed rounded-[10px] box-border flex-col bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
            <div className="flex flex-row items-center mb-[20px]">
                <p className="font-bold m-auto">{modalName}</p>
                <IoMdClose className="text-[1.8em] p-[5px] cursor-pointer rounded-full hover:bg-[#E8E7E7]" onClick={onClose} />
            </div>
            <p className="leading-6 mb-[20px]">{text}</p>
            <button className="w-full text-white font-bold bg-[#d60202] hover:bg-[#b80202]" onClick={onDelete}>Delete</button>
        </div>
    );
}

export default DeletionModal;
