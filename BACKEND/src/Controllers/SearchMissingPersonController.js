// import axios from "axios";
// import { rekognition } from "../Services/awsService.js";
// import SearchMissingPerson from "../DataModels/SearchMissingPersonModel.js";
// import UploadMissingPerson from "../DataModels/UploadMissingPersonModel.js";

//  const searchMissingPerson = async (req, res) => {
//   try {
//     const {
//       approxAge,
//       foundLocation,
//       bodyFeatures,
//       notes
//     } = req.body;

//     const photoUrl = req.file.path;

//     // Download image buffer
//     const imgBuffer = (
//       await axios.get(photoUrl, { responseType: "arraybuffer" })
//     ).data;

//     // 🔍 Match image with Rekognition collection
//     const matchResult = await rekognition
//       .searchFacesByImage({
//         CollectionId: "missing_persons_faces",
//         Image: { Bytes: Buffer.from(imgBuffer) },
//         FaceMatchThreshold: 90,
//         MaxFaces: 1,
//       })
//       .promise();

//     let matchedPerson = null;

//     if (matchResult.FaceMatches.length > 0) {
//       const matchedFaceId = matchResult.FaceMatches[0].Face.FaceId;

//       // Find person in MongoDB with this faceId
//       matchedPerson = await UploadMissingPerson.findOne({ faceId: matchedFaceId })
//         .populate("reportedBy");
//     }

//     // Save search report regardless of match
//     const newSearch = await SearchMissingPerson.create({
//       photoUrl,
//       approxAge,
//       foundLocation: JSON.parse(foundLocation),
//       bodyFeatures: JSON.parse(bodyFeatures),
//       notes,
//       finder: req.user._id,
//       possibleMatch: matchedPerson ? matchedPerson._id : null,
//     });

//     if (!matchedPerson) {
//       return res.json({
//         success: true,
//         message: "No match found.",
//         data: newSearch,
//       });
//     }

//     // If matched
//     res.json({
//       success: true,
//       message: "Match found",
//       match: matchedPerson,
//       report: newSearch,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };


// export SearchMissingPerson;


// import axios from "axios";
// import { rekognition } from "../Services/awsService.js";
// import SearchMissingPerson from "../DataModels/SearchMissingPersonModel.js";
// import UploadMissingPerson from "../DataModels/UploadMissingPersonModel.js";
// import  uploadOnCloudinary from "../Configs/cloudinaryUpload.js"

// export const searchMissingPerson = async (req, res) => {
//   try {
//     const {
//       approxAge,
//       foundLocation,
//       bodyFeatures,
//       notes
//     } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "Image required" });
//     }

//     // 1) Upload user-found image to Cloudinary
//     const imageUrl = await uploadOnCloudinary(req.file.path);

//     // 2) Download image as buffer
//     const imgResp = await axios.get(imageUrl, { responseType: "arraybuffer" });
//     const imgBuffer = Buffer.from(imgResp.data, "binary");

//     // 3) Search in Rekognition collection
//     const matchResult = await rekognition.searchFacesByImage({
//       CollectionId: "missing_persons_faces",
//       Image: { Bytes: imgBuffer },
//       FaceMatchThreshold: 85,
//       MaxFaces: 1,
//     }).promise();

//     let matchedPerson = null;

//     if (matchResult.FaceMatches && matchResult.FaceMatches.length > 0) {
//       const matchedFaceId = matchResult.FaceMatches[0].Face.FaceId;

//       matchedPerson = await UploadMissingPerson.findOne({ faceId: matchedFaceId })
//         .populate("reportedBy");
//     }

//     // 4) Save search report
//     const searchReport = await SearchMissingPerson.create({
//       photoUrl: imageUrl,
//       approxAge,
//       foundLocation,
//       bodyFeatures,
//       notes,
//       finder: req.user._id,
//       possibleMatch: matchedPerson ? matchedPerson._id : null,
//     });

//     return res.json({
//       success: true,
//       message: matchedPerson ? "Match found" : "No match found",
//       match: matchedPerson || null,
//       report: searchReport,
//     });

//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };



import axios from "axios";
import UploadMissingPerson from "../DataModels/UploadMissingPersonModel.js";
import SearchMissingPerson from "../DataModels/SearchMissingPersonModel.js";

import {
  rekognition,
  SearchFacesByImageCommand
} from "../Configs/aws-sdk.js";

export const searchMissingPerson = async (req, res) => {
  try {
    const { approxAge, foundLocation, bodyFeatures, notes } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    // 1️⃣ Cloudinary URL (already uploaded by multer)
    const imageUrl = req.file.path;

    // 2️⃣ Download image buffer
    const imageResp = await axios.get(imageUrl, {
      responseType: "arraybuffer"
    });

    const imageBuffer = Buffer.from(imageResp.data);

    // 3️⃣ Rekognition search
    const command = new SearchFacesByImageCommand({
      CollectionId: "missing_persons_faces",
      Image: { Bytes: imageBuffer },
      FaceMatchThreshold: 85,
      MaxFaces: 1
    });

    const rekogResult = await rekognition.send(command);

    let matchedPerson = null;
    let similarity = null;

    if (rekogResult.FaceMatches?.length > 0) {
      const match = rekogResult.FaceMatches[0];
      similarity = match.Similarity;

      matchedPerson = await UploadMissingPerson.findOne({
        faceId: match.Face.FaceId
      }).populate("reportedBy");
    }

    // 4️⃣ Save search report
    const searchReport = await SearchMissingPerson.create({
      photoUrl: imageUrl,
      approxAge,
      foundLocation: foundLocation
        ? typeof foundLocation === "string"
          ? JSON.parse(foundLocation)
          : foundLocation
        : null,
      bodyFeatures: bodyFeatures
        ? typeof bodyFeatures === "string"
          ? JSON.parse(bodyFeatures)
          : bodyFeatures
        : null,
      notes,
      finder: req.user._id,
      possibleMatch: matchedPerson ? matchedPerson._id : null,
      similarity
    });

    return res.status(200).json({
      success: true,
      matchFound: !!matchedPerson,
      similarity,
      match: matchedPerson,
      report: searchReport
    });

  } catch (error) {
    console.error("SEARCH ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
