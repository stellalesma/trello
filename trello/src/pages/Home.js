import AddList from '../components/ManageList/AddList';
import AllLists from "../components/ManageList/AllLists";

function Home() {

    return (
        <div className="main" style={{ display: 'flex', flexDirection: 'row' }}>
            <AllLists />
            <AddList />
        </div>
    );
}

export default Home;
