import { useEffect, useState } from "react";

const ViewTeams = () => {
    const [teams, setTeams] = useState([]);
    const getTeams = async () => {
        try{
            const response = await fetch("http://localhost:3000/show-teams", {
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("error");
            }
            const gettingteams = await response.json();
            console.log(gettingteams);
            setTeams(gettingteams);
        } catch(error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getTeams();
    },[]);
    return (
        <div className="flex flex-col items-center justify-center">
            {teams?.map((team, teamIndex) => {
                return (
                <div key={teamIndex} className="bg-base-300 min-w-[500px] mt-3 p-5 rounded-md">
                    <h1 className="bg-base-200 w-fit p-2 rounded-md mb-2">{team._id}</h1>
                    {team.members?.map((member, index) => {
                        return (
                            <div key={index} className={`flex items-center justify-between p-2 rounded-md mt-1 ${ member.lead ? "bg-base-100" : "bg-base-300" }`}>
                                <h1>{member.studentId}</h1>
                                <h1>{member.studentName}</h1>
                                <h1>{member.domain}</h1>
                            </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}

export default ViewTeams;