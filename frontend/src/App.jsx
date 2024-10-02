import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./utils/home";
import RegisterTeam from "./utils/register";
import ShowTeams from "./utils/showTeams";
import ViewTeams from "./utils/viewTeams";
import Participants from "./utils/participants";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/new-team" exact element={<RegisterTeam/>}/>
          <Route path="/add-student" exact element={<ShowTeams/>}/>
          <Route path="/add-student/:teamId" exact element={<RegisterTeam/>}/>
          <Route path="/show-teams" exact element={<ViewTeams/>}/>
          <Route path="/participants" exact element={<Participants/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
