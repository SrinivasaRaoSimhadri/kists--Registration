import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const RegisterTeam = () => {
    const [studentId, setStudentId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [domain, setDomain] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {teamId} = useParams();
    console.log(teamId);
    console.log(location.pathname);
    const handleClick = (getdomain) => {
        setDomain(getdomain);
    }

    const handleRegister = async () => {
        try{
            const response = await fetch(`http://localhost:3000/${teamId ? `add-student/${teamId}` : "new-team"}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    studentId,
                    studentName,
                    domain
                }),
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("error");
            }
            setIsRegistered(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch(error) {
            console.log(error);
        }
    }
    return(
        <div className="flex items-center justify-center h-screen min-w-[100px]">
            <div className="flex flex-col gap-3 bg-base-300  p-10 rounded-md">
                <div>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Student ID</span>
                        </div>
                        <input 
                            value={studentId} 
                            type="text"  
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setStudentId(e.target.value)}
                         />
                    </label>
                </div>
                <div>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Student Name</span>
                        </div>
                        <input 
                            value={studentName} 
                            type="text"  
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>setStudentName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="w-full rounded-md bg-base-100 py-3 px-[130px] text-center mt-3">{ domain  || "Domain"}</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a onClick={() => handleClick("VLSI")}>VLSI</a></li>
                                <li><a onClick={() => handleClick("ES")}>EMBEDDED</a></li>
                                <li><a onClick={() => handleClick("ESP")}>IOT ESP32</a></li>
                                <li><a onClick={() => handleClick("RBPI")}>IOT RASPBERRYPIE</a></li>
                            </ul>
                        </div>
                    </div>
                    {
                        isRegistered && (
                            <div className="bg-green-500 py-3 text-center text-white rounded-md mt-3">Successfully registered!</div>
                        )
                    }
                    <button onClick={()=>handleRegister()} className="bg-gray-800 py-3 rounded-md mt-3">Register</button>
                </div>
            </div>
    )
}

export default RegisterTeam;