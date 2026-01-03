// import {
//   RekognitionClient,
//   CompareFacesCommand
// } from "@aws-sdk/client-rekognition";

// const rekognition = new RekognitionClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// export { rekognition, CompareFacesCommand };


// src/Configs/aws-sdk.js
import dotenv from "dotenv";
dotenv.config();

import {
  RekognitionClient,
  CreateCollectionCommand,
  IndexFacesCommand,
  SearchFacesByImageCommand,
  CompareFacesCommand,
  ListCollectionsCommand
} from "@aws-sdk/client-rekognition";

const rekognition = new RekognitionClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export {
  rekognition,
  CreateCollectionCommand,
  IndexFacesCommand,
  SearchFacesByImageCommand,
  CompareFacesCommand,
  ListCollectionsCommand,
};




























// this is the v3 code 

// import {
//   RekognitionClient,
//   IndexFacesCommand,
//   CreateCollectionCommand
// } from "@aws-sdk/client-rekognition";

// export const rekognition = new RekognitionClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// export { IndexFacesCommand, CreateCollectionCommand };
