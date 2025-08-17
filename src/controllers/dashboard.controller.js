import { ApiError } from "../utils/apirError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAllWorkSpacesOfUser } from "../services/dashboard.service.js";

const getDashboardInfo = asyncHandler( async (req,res) => {
    try {
        const userId = req.user?._id
        if(!userId) throw new ApiError(404,"user id not found");
        
        const workspaces = await getAllWorkSpacesOfUser(userId)
        if(!workspaces) throw new ApiError(404,"invalid user id");
    
        return res.status(200)
        .json(new ApiResponse(
            200,
            workspaces,
            "user dashboard info fetch successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Error while getting user workspaces")
    }
})

export {
    getDashboardInfo
}