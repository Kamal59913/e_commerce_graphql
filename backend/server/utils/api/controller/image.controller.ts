import asyncHandler from "../responses/asyncHandler";
import ApiError from "../responses/apiError";
import userModel from "../../../db/models/users_model/users.model";
import { uploadOnCloudinary } from "../utils/cloudinary/cloudinary";
import { ApiResponse } from "../responses/apiResponse";

const updateProfileImage = asyncHandler(async (req,res) => {
     console.log("reached here", req.file)
     const ProfileImageLocalpath = req.file?.path

     if(!ProfileImageLocalpath) {
          throw new ApiError(400, "ProfileImage file is missing")
     }

     const ProfileImage = await uploadOnCloudinary(ProfileImageLocalpath)

     if(!ProfileImage.url) {
          throw new ApiError(400, "Error while uploading on ProfileImage")
     }

     const user = await userModel.findByIdAndUpdate(
          req.user?._id,
          {
               $set:{
                    image: ProfileImage.url
               }
          },
          {new: true}
     ).select("-password")

     return res
     .status(200)
     .json(new ApiResponse(200, ProfileImage.url, "ProfileImage updated successfully"))
})

const deleteProfileImage = asyncHandler(async (req,res) => {
     const user = await userModel.findByIdAndUpdate(
          req.user?._id,
          {
               $unset:{
                    image: ""
               }
          },
          {new: true}
     ).select("-password")

     return res
     .status(200)
     .json(new ApiResponse(200, user, "ProfileImage deleted successfully"))
})


export {
     updateProfileImage,
     deleteProfileImage,

};