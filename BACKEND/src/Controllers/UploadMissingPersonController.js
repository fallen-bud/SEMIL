//  const uploadMissingPerson = async (req, res) => {
//   try {
//     const {
//       name, age, location, bodyFeatures, costume, markOnBody
//     } = req.body;

//     // URL from Cloudinary
//     const photoUrl = req.file.path;

//     const person = await UploadMissingPerson.create({
//       name,
//       age,
//       location,
//       bodyFeatures,
//       costume,
//       markOnBody,
//       photoUrl,
//       reportedBy: req.user._id
//     });

//     res.status(201).json({
//       success: true,
//       message: "Missing person uploaded",
//       data: person
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export uploadMissingPerson;


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%%%%

// import axios from "axios";
// import { rekognition } from "../Services/awsService.js";
// import UploadMissingPerson from "../DataModels/UploadMissingPersonModel.js";

//  const uploadMissingPerson = async (req, res) => {
//   try {
//     const { name, age, location, bodyFeatures, costume, markOnBody } = req.body;

//     // Cloudinary gives URL inside req.file.path
//     const photoUrl = req.file.path;

//     // 1️⃣ Download image buffer for Rekognition
//     const imgBuffer = (
//       await axios.get(photoUrl, { responseType: "arraybuffer" })
//     ).data;

//     // 2️⃣ Index face into Rekognition collection
//     const rekogResult = await rekognition
//       .indexFaces({
//         CollectionId: "missing_persons_faces",
//         Image: { Bytes: Buffer.from(imgBuffer) },
//         MaxFaces: 1,
//         QualityFilter: "AUTO",
//       })
//       .promise();

//     if (!rekogResult.FaceRecords.length) {
//       return res.status(400).json({
//         success: false,
//         message: "No detectable face found in the uploaded image.",
//       });
//     }

//     const faceId = rekogResult.FaceRecords[0].Face.FaceId;

//     // 3️⃣ Save missing person entry in MongoDB
//     const person = await UploadMissingPerson.create({
//       name,
//       age,
//       location: JSON.parse(location),
//       bodyFeatures: JSON.parse(bodyFeatures),
//       costume,
//       markOnBody,
//       photoUrl,
//       faceId : faceId,
//       reportedBy: req.user._id,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Missing person uploaded successfully",
//       data: person,
//     });
//   } 
//  catch (error) {
//   console.error("UPLOAD ERROR FULL:", JSON.stringify(error, null, 2));
  
//   return res.status(500).json({
//     success: false,
//     message: error.message,
//     fullError: error,     // send full raw error
//     axiosError: error.response?.data, // axios errors
//     awsError: error.code || error.name // AWS errors
//   });
// }


// };


// export {uploadMissingPerson};

// import axios from "axios";
// import { rekognition } from "../Services/awsService.js";
// import UploadMissingPerson from "../DataModels/UploadMissingPersonModel.js";

// export const uploadMissingPerson = async (req, res) => {
//   try {
//     console.log("---- DEBUG START ----");
//     console.log("USER:", req.user);
//     console.log("FILE:", req.file);
//     console.log("BODY:", req.body);

//     const { name, age, location, bodyFeatures, costume, markOnBody } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No photo uploaded" });
//     }

//     const photoUrl = req.file.path;
//     console.log("PHOTO URL:", photoUrl);

//     // Download file for Rekognition
//     const imgBuffer = (await axios.get(photoUrl, { responseType: "arraybuffer" })).data;

//     // Index face
//     const rekogResult = await rekognition
//       .indexFaces({
//         CollectionId: "missing_persons_faces",
//         Image: { Bytes: Buffer.from(imgBuffer) },
//         MaxFaces: 1,
//         QualityFilter: "AUTO",
//       })
//       .promise();

//     console.log("REKOG RESULT:", rekogResult);

//     if (!rekogResult.FaceRecords.length) {
//       return res.status(400).json({
//         success: false,
//         message: "No detectable face in the uploaded image",
//       });
//     }

//     const faceId = rekogResult.FaceRecords[0].Face.FaceId;

//     const person = await UploadMissingPerson.create({
//       name,
//       age,
//       location: typeof location === "string" ? JSON.parse(location): location,
//       bodyFeatures: typeof bodyFeatures === "string" ? JSON.parse(bodyFeatures): bodyFeatures,
//       costume,
//       markOnBody,
//       photoUrl,
//       faceId,
//       reportedBy: req.user._id,
//     });

//     console.log("---- DEBUG END ----");

//     return res.status(201).json({
//       success: true,
//       message: "Missing person uploaded successfully",
//       data: person,
//     });

//   } catch (error) {
//     console.error("🔥 FULL ERROR:", JSON.stringify(error, null, 2));

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//       stack: error.stack,
//       full: error,
//       axios: error.response?.data,
//     });
//   }
// };



import axios from "axios";
import {
  rekognition,
  IndexFacesCommand
} from "../Configs/aws-sdk.js";

import UploadMissingPerson from "../DataModels/UploadMissingPersonModel.js";

export const uploadMissingPerson = async (req, res) => {
  try {
    console.log("---- DEBUG START ----");
    console.log("USER:", req.user);
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No photo uploaded",
      });
    }

    const {
      name,
      age,
      location,
      bodyFeatures,
      costume,
      markOnBody,
    } = req.body;

    const photoUrl = req.file.path;

    // 🔹 Download image from Cloudinary
    const imgBuffer = (
      await axios.get(photoUrl, { responseType: "arraybuffer" })
    ).data;

    // 🔹 SDK v3 command
    const command = new IndexFacesCommand({
      CollectionId: "missing_persons_faces",
      Image: {
        Bytes: Buffer.from(imgBuffer),
      },
      MaxFaces: 1,
      QualityFilter: "AUTO",
    });

    const rekogResult = await rekognition.send(command);

    console.log("REKOG RESULT:", rekogResult);

    if (!rekogResult.FaceRecords || rekogResult.FaceRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No detectable face in the uploaded image",
      });
    }

    const faceId = rekogResult.FaceRecords[0].Face.FaceId;

    const person = await UploadMissingPerson.create({
      name,
      age,
      location: typeof location === "string" ? JSON.parse(location) : location,
      bodyFeatures:
        typeof bodyFeatures === "string"
          ? JSON.parse(bodyFeatures)
          : bodyFeatures,
      costume,
      markOnBody,
      photoUrl,
      faceId,
      reportedBy: req.user._id,
    });

    console.log("---- DEBUG END ----");

    return res.status(201).json({
      success: true,
      message: "Missing person uploaded successfully",
      data: person,
    });

  } catch (error) {
    console.error("🔥 UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
