import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullName, password } = req.body;
    if ([username, fullName, email, password].some(field => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists"); // if user found, stop
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar files is required")
    }
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar files is required")
    }

    const user = await User.create({ 
        username:username.toLowerCase(),
        email,
        fullName,
        avatar:avatar.url,
        coverImage:coverImage.url || "",
        password 
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "User not created")
    }

    return res.status(201).json(new ApiResponse(200, createdUser , "register successful"));

})
export { registerUser }