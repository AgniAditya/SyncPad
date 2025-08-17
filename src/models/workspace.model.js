import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
    },
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document"
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
},{timestamps:true});

export const Workspace = mongoose.model("Workspace",workspaceSchema)