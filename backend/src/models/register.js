const mongoose = require("mongoose");
const Counter = require("./counter");
const RegisteSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    teamId: {
        type: String,
    },
    studentName: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        enum: ["VLSI", "ES", "ESP", "RBPI"],
        default: "VLSI"
    },
    lead: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

RegisteSchema.pre("save", async function(next) {
    const registration = this;
    if(registration.lead) {
        let counter = await Counter.findOne();
        if(!counter) {
            counter = new Counter({seq: 1})
            await counter.save();
        } else {
            counter.seq = counter.seq + 1;
            await counter.save();
        }
        registration.teamId = registration.domain + String(counter.seq).padStart(8-registration.domain.length,"0");
    }
    next();
})

const Register = mongoose.models?.Register || mongoose.model("Register", RegisteSchema);
module.exports = Register;