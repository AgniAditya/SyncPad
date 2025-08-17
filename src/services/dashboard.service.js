import { Workspace } from "../models/workspace.model.js"
import { ApiError } from "../utils/apirError.js"

const getAllWorkSpacesOfUser = async (adminId) => {
    const workspaces = await Workspace.find({admin : adminId})
    if(!workspaces) throw new ApiError(404,"invalid admin id");

    return workspaces;
}

export {
    getAllWorkSpacesOfUser
}