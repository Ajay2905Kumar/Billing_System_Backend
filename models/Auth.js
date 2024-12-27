import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    username: {
        type: String,
        required: "Username required",
        unique: true,
    },
    password: {
        type: String,
        required: "Password required",
    },
});

export default mongoose.model("Auth", authSchema);