import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col gap-3 bg-base-300 h-fit w-fit p-10 rounded-md">
                <button onClick={() => navigate("/new-team")} className="bg-gray-800 text-white rounded-md px-7 py-2">New Team</button>
                <button onClick={() => navigate("/add-student")} className="bg-gray-800 text-white rounded-md px-7 py-2">Add student</button> 
                <button onClick={() => navigate("/show-teams")} className="bg-gray-800 text-white rounded-md px-7 py-2">view Teams</button>
                <button onClick={() => navigate("/participants")} className="bg-gray-800 text-white rounded-md px-7 py-2">Participants</button>
            </div>
        </div>
    )
}
export default Home;