// import { ApiError } from "../Utils/apiError";
// import { asyncHandler } from "../Utils/asyncHandler";
// import jwt from 'jsonwebtoken';
// import {User} from "../DataModels/UserModel.js";

// export const verifyJWT = asyncHandler(async(req, res, next) => {
//     try {
//         const token = req.cookies?.accessToken ||
//                       req.header("Authorization")?.replace("Bearer ", "")
        
//         // console.log(token);
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request : No token provided")
//         }
    
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
//         const user = await User.findById(decodedToken?._id).select("-Password -refreshToken")
    
//         if (!user) {
            
//             throw new ApiError(401, "Invalid Access Token")
//         }
    
//         req.user = user;
//         next()
//     } catch (error) {
//         throw new ApiError(401,"User not found or Invalid access token")
//     }
    
// })

import { ApiError } from "../Utils/apiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import  User  from "../DataModels/UserModel.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // Get token from cookie or header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request: No token provided");
  }

  // Verify JWT
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  // Validate user
  const user = await User.findById(decoded._id).select(
    "-Password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "User not found or token invalid");
  }

  req.user = user; // Attach user to request
  next();
});
