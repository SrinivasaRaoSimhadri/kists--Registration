const mongoose  = require("mongoose");
const counterSchmea = new mongoose.Schema({
    seq: {
        type: Number,
        default: 0
    }
})

const Counter = mongoose.models?.Counter || mongoose.model("Counter", counterSchmea);
module.exports = Counter;