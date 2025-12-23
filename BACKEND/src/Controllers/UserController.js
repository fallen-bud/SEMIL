import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../DataModels/UserModel.js";


// const generateAccessAndRefereshTokens = async(userId) =>{
//     try {
//         const user = await User.findById(userId)
//         const accessToken = user.generateAccessToken()
//         const refreshToken = user.generateRefreshToken()

//         user.refreshToken = refreshToken
//         await user.save({ validateBeforeSave: false })

//         return {accessToken, refreshToken}


//     } catch (error) {
//         throw new ApiError(500, "Something went wrong while generating referesh and access token")
//     }
// }




// -------------------------------
// Generate Access & Refresh Tokens
// -------------------------------
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};


// --------------------
// SIGNUP
// --------------------
export const registerUser = asyncHandler(async (req, res) => {
  const { Username, Name, Number, Password, Address } = req.body;

  if (!Username || !Name || !Number || !Password || !Address) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ 
    $or: [{ Username }, { Number }]
  });

  if (existingUser) {
    throw new ApiError(400, "Username or Number already exists");
  }

  const user = await User.create({
    Username,
    Name,
    Number,
    Password,
    Address
  });

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        {
          user: {
            _id: user._id,
            Username: user.Username,
            Name: user.Name,
            Number: user.Number,
            Address: user.Address
          },
          accessToken,
          refreshToken
        },
        "User registered successfully"
      )
    );
});




// --------------------
// LOGIN
// --------------------
export const loginUser = asyncHandler(async (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password) {
    throw new ApiError(400, "Username and Password required");
  }

  const user = await User.findOne({ Username });

  if (!user) throw new ApiError(404, "User not found");

  const validPassword = await user.isPasswordCorrect(Password);

  if (!validPassword) throw new ApiError(401, "Incorrect password");

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            _id: user._id,
            Username: user.Username,
            Name: user.Name,
            Number: user.Number,
            Address: user.Address
          },
          accessToken,
          refreshToken
        },
        "Login successful"
      )
    );
});




// --------------------
// REFRESH TOKEN
// --------------------
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new ApiError(401, "Refresh token required");

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decoded._id);

  if (!user) throw new ApiError(401, "Invalid refresh token");

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Refresh token expired or invalid.");
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefereshTokens(user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Token refreshed"));
});




// --------------------
// LOGOUT
// --------------------
export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await User.findByIdAndUpdate(userId, {
    $set: { refreshToken: null }
  });

  return res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
});

