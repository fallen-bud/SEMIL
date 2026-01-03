// import { rekognition } from "./awsService.js";

// rekognition.createCollection(
//   { CollectionId: "missing_persons_faces" },
//   (err, data) => {
//     if (err) console.log(err);
//     else console.log("Collection Created:", data);
//   }
// );





// import {
//   rekognition,
//   CreateCollectionCommand
// } from "../Configs/aws-sdk.js";

// const COLLECTION_ID = "missing_persons_faces";

// const run = async () => {
//   try {
//     const command = new CreateCollectionCommand({
//       CollectionId: COLLECTION_ID,
//     });

//     const response = await rekognition.send(command);
//     console.log("✔ Collection created:", response);
//   } catch (err) {
//     // If it already exists, we can ignore
//     if (err.name === "ResourceAlreadyExistsException") {
//       console.log("✔ Collection already exists:", COLLECTION_ID);
//     } else {
//       console.error("❌ Error creating collection:", err);
//     }
//   }
// };


// run();



import { rekognition, CreateCollectionCommand } from "../Configs/aws-sdk.js";

export async function ensureCollectionExists() {
  try {
    const params = { CollectionId: "missing_persons_faces" };

    const command = new CreateCollectionCommand(params);
    const response = await rekognition.send(command);

    console.log("✔ Rekognition Collection Created:", response);
  } catch (err) {
    if (err.name === "ResourceAlreadyExistsException") {
      console.log("ℹ Collection already exists.");
    } else {
      console.error("❌ Error creating collection:", err);
    }
  }
}







