import { useEffect, useState } from "react";

const Participants = () =>{
    const [participants, setParticipants]  = useState([]);
    const [search, setSearch] = useState("");
    const getParticipants = async () => {
        try{
            const response = await fetch("http://localhost:3000/participants", {
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("error");
            }
            const participants = await response.json();
            setParticipants(participants);
        } catch(error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getParticipants();
    },[]);
    useEffect(()=>{
        const contestents = participants.filter((candidate) => {
            return (
                candidate.studentId.toLowerCase().includes(search.toLowerCase()) || 
                candidate.teamId.toLowerCase().includes(search.toLowerCase())  || 
                candidate.studentName.toLowerCase().includes(search.toLowerCase()) || 
                candidate.domain.toLowerCase().includes(search.toLowerCase())
            )
        })
        setParticipants(contestents);
        if(!search) {
            getParticipants();
        }
    },[search]);
    return (
        <div>
            <div className="flex items-center justify-center"  >
                <input value={search}  onChange={(e)=>setSearch(e.target.value)} className="py-3 bg-base-300 mt-4 mb-5 min-w-[400px] p-4 rounded-md" placeholder="ID or name or teamId.." />
            </div>
            <div className="flex  items-center justify-between gap-2 bg-base-300 mt-2 py-3 rounded-md max-w-[820px] mx-auto">
                <h1 className="text-center min-w-[200px]">Team ID</h1>
                <h1 className="text-center min-w-[200px]">Student ID</h1>
                <h1 className="text-center min-w-[200px]">Student Name</h1>
                <h1 className="text-center min-w-[200px]">Domain</h1>
            </div>
            <div className="flex justify-center">
            <div className="">
                {
                    participants?.map((student, index) => {
                        return(
                            <div className="flex  items-center justify-between gap-2 bg-base-300 mt-2 py-3 rounded-md">
                                <h1 className="text-center min-w-[200px]">{student.teamId}</h1>
                                <h1 className="text-center min-w-[200px]">{student.studentId}</h1>
                                <h1 className="text-center min-w-[200px]">{student.studentName}</h1>
                                <h1 className="text-center min-w-[200px]">{student.domain}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </div>
    )
}

export default Participants;