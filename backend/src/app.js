const express = require("express");
const ConnectDB = require("./config/connectDB");
const cors = require("cors");
const Register = require("./models/register");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.post("/new-team", async (req, res) => {
    try {
        const {studentId, studentName, domain} = req.body;
        const newTeam = new Register({
            studentId, 
            studentName,
            domain,
            lead: true
        })
        const registeredTeam = await newTeam.save();
        res.send(registeredTeam);
    } catch (error) {
        res.status(400).send("Error: "+error.message);
    }
})

app.get("/add-student", async (req, res) => {
    try {
        const teamLeads = await Register.find({
            lead: true
        });
        res.send(teamLeads);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

app.post("/add-student/:teamId", async (req, res) => {
    try {
        const {teamId} = req.params;
        const {studentId, studentName, domain} = req.body;
        const newTeam = new Register({
            studentId, 
            teamId,
            studentName,
            domain,
        })
        const registeredTeam = await newTeam.save();
        res.send(registeredTeam);
    } catch (error) {
        res.status(400).send("Error: "+error.message);
    }
})

app.get("/show-teams", async (req, res) => {
    try {
        const teams = await Register.aggregate([
            {
                $group: {
                    _id: "$teamId",
                    members: { $push: "$$ROOT" }
                }
            }
        ]);
        res.send(teams);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

app.get("/participants", async (req, res) => {
    try {
        const participants = await Register.find({});
        res.send(participants);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

const Start = async () => {
    try{
        await ConnectDB();
        app.listen(3000, () => {
            console.log("listening to port 3000")
        })
    } catch(error) {
        console.log(error.message);
    }
}
Start();