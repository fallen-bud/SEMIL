import express from "express";
import upload from "../Services/upload.js";
import { verifyJWT } from "../Middlewares/authMiddleware.js";
import {searchMissingPerson} from "../Controllers/SearchMissingPersonController.js";
import {uploadMissingPerson} from "../Controllers/UploadMissingPersonController.js";

const router = express.Router();

// outer.post("/missing/upload", verifyJWT, upload.single("photo"), uploadMissingPerson);
router.post("/missing/search", verifyJWT, upload.single("photo"), searchMissingPerson);

// for testing purpose
router.post(
  "/missing/upload",
  verifyJWT,
  (req, res, next) => {
    upload.single("photo")(req, res, (err) => {
      if (err) {
        console.log("🔥 MULTER ERROR:", err);
        return res.status(400).json({ error: err.message, full: err });
      }
      next();
    });
  },
  uploadMissingPerson
);


export default router;
// agar confusion hua to alag kar dena in future