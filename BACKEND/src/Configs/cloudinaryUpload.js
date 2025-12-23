// import { v2 as cloudinary } from "cloudinary";
// import { ApiError } from "../Utils/apiError.js";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     const result = await cloudinary.uploader.upload(localFilePath, {
//       folder: "missing-persons",
//     });

//     return result;
//   } catch (error) {
//     throw new ApiError(500, "Cloudinary upload failed");
//   }
// };

// export default uploadOnCloudinary

import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary ENV check:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "loaded" : "missing"
});


export default cloudinary;
