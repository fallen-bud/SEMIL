import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Configs/cloudinaryUpload.js";


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "missing-persons",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

export default upload;
