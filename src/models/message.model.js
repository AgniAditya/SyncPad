import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
    },
    text: {
        type: String,
    }
},{timestamps:true})

export const Message = mongoose.model("Message",messageSchema)