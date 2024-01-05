import { useState } from "react";

import AddList from '../components/AddList';
import AllLists from "../components/AllLists";

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

    return (
        <div className="main" style={{ display: 'flex', flexDirection: 'row' }}>
            <AllLists lists={lists} onListEditing={handleListEditing}/>
            <AddList onAddList={handleAddList}/>
        </div>
    );
}

export default Home;
