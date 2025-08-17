import { ApiError } from "../utils/apirError.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { createNewWorkSpcae } from "../services/workspace.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createWorkSpace = asyncHandler( async (req,res) => {
    try {
        const { title , description = '' , document = '' , members = [] } = req.body
        const admin = req?.user
        if(!title || !admin) throw new ApiError(404,"title and admin both are required");
    
        const createdWorkspace = await createNewWorkSpcae(admin,title,description,document,members);
    
        return res.status(200)
        .json(new ApiResponse(
            200,
            createWorkSpace,
            "new workspace is created successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "error while creating new workspace");
    }
})

export {
    createWorkSpace
}