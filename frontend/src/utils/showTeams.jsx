import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ShowTeams = () =>{
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();
    const getTeams = async () => {
        try{
            const response = await fetch("http://localhost:3000/add-student", {
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("error");
            }
            const gettingteams = await response.json();
            setTeams(gettingteams);
        } catch(error) {
            console.log(error);
        }
    }

    const addMember = (teamId) => {
        navigate(`/add-student/${teamId}`);
    }
    
    useEffect(()=>{
        getTeams();
    },[]);
    
    return (
        <div>
            <div className="flex items-center justify-between mx-auto gap-2 bg-gray-700 text-white p-2 mt-2 rounded-md max-w-[800px]">
                <h1 className="text-center min-w-[200px] py-3">Team ID</h1>
                <h1 className="text-center min-w-[200px]">Student ID</h1>
                <h1 className="text-center min-w-[200px]">Student Name</h1>
                <h1 className="text-center min-w-[200px]">Domain</h1>
            </div>
            {
                teams?.map((team, index)=>{
                    return (
                            <div onClick={() => addMember(team.teamId)} className="py-3 flex items-center justify-between mx-auto gap-2 bg-base-300 p-2 mt-2 rounded-md max-w-[800px] hover:cursor-pointer" key={index}>
                                <h1 className="text-center min-w-[200px]">{team.teamId}</h1>
                                <h1 className="text-center min-w-[200px]">{team.studentId}</h1>
                                <h1 className="text-center min-w-[200px]">{team.studentName}</h1>
                                <h1 className="text-center min-w-[200px]">{team.domain}</h1>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default ShowTeams;