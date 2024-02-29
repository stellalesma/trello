import AddList from '../components/ManageList/AddList';
import AllLists from "../components/ManageList/AllLists";

function Home() {
    return (
        <div className="flex h-screen p-[15px] overflow-x-auto overflow-y-hidden">
            <AllLists />
            <AddList />
        </div>
    );
}

export default Home;
