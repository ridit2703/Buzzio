import {asyncHandler } from"../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser=asyncHandler(async(req,res)=>{
    res.status(200).json({message:"ok"})

    const {fullName,email,username,password}=req.body

    if(
        [username,email,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }
    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with this credentials already exist")
    }
    console.log(req.files)
    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverImageLocalPath=req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"")
    }

    const avatar=await uploadCloudinary(avatarLocalPath)
    const coverImage=await uploadCloudinary(coverImageLocalPath)

    if(avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user =await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    console.log(user)
    const createdUser=await User.findById(user._id).select("-password -refreshToken")

    if(!createUser){
        throw new ApiError(500,"something went wrong while registering userr")
    }
    res.status(202).json(new ApiResponse(200,createdUser,"User registered successfully"))

})


export {registerUser}