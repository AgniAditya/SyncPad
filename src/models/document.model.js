import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    content: {
        type: String,
        required: true
    },
    onwer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    collaborators : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
},{timestamps:true})

export const Document = mongoose.model("Document",documentSchema)