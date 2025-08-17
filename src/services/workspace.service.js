import { ApiError } from "../utils/apirError.js"
import { Workspace } from "../models/workspace.model.js"

const createNewWorkSpcae = async (admin,title,description,document,members) => {
    const createNewWorkSpace = await Workspace.create({
        title,
        admin,
        description,
        document,
        members
    })
    if(!createNewWorkSpace) throw new ApiError(404,"invalid input data");

    return createNewWorkSpace
}

export {
    createNewWorkSpcae
}