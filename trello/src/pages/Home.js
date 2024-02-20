import { useState } from "react";

import AddList from '../components/ManageList/AddList';
import AllLists from "../components/ManageList/AllLists";

function Home() {
	const [lists, setLists] = useState([])

	const handleAddList = (newList) => {
		setLists([...lists, newList]);
	};

    const handleListEditing = (id, newList) => {
		const tmp = lists.slice();
		tmp[id] = newList;
		setLists(tmp);
	};

    const handleReorganizeLists = (newLists) => {
		console.log("all home", lists);
        setLists(newLists);
    };

    return (
        <div className="main" style={{ display: 'flex', flexDirection: 'row' }}>
            <AllLists lists={lists} onListEditing={handleListEditing} onReorganize={handleReorganizeLists} />
            <AddList onAddList={handleAddList} />
        </div>
    );
}

export default Home;
