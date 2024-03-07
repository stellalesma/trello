import React from "react";

import { IoMdClose } from "react-icons/io";

export default function ListActions({ onClose }) {
	return (
		<div className="w-[300px] py-[10px] -mt-[10px] ml-[280px] rounded-[10px] fixed bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
			<div className="flex items-center justify-between mb-[15px] pr-[10px]">
				<p className="w-full font-bold text-center">List actions</p>
				<IoMdClose className="text-[2em] p-[7px] rounded-[5px] cursor-pointer hover:bg-[#DFECEE]" onClick={onClose} />
			</div>
			<p className="px-[10px] py-[7px] cursor-pointer hover:bg-[#E8E0EC]">Add card</p>
			<p className="px-[10px] py-[7px] cursor-pointer hover:bg-[#E8E0EC]">Copy list</p>
			<p className="px-[10px] py-[7px] cursor-pointer hover:bg-[#E8E0EC]">Move list</p>
			<hr />
			<p className="px-[10px] py-[7px] cursor-pointer hover:bg-[#E8E0EC]">Sort by...</p>
			<hr />
			<p className="px-[10px] py-[7px] cursor-pointer hover:bg-[#E8E0EC]">Move all cards in the list</p>
			<p className="px-[10px] py-[7px] cursor-pointer hover:bg-[#E8E0EC]">Delete all cards in the list</p>
			<hr />
			<p className="px-[10px] py-[7px] cursor-pointer hover:bg-[#E8E0EC]">Delete this list</p>
		</div>
	);
}
