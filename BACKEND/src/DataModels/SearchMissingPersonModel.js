import mongoose,{Schema} from 'mongoose';


const SearchMissingPersonSchema = new mongoose.Schema(
  {
    photoUrl: { type: String, required: true },
    bodyFeatures: {
        height: { type: String,required:true},       // e.g. "5'9" or "175 cm"
        weight: { type: String,required:false },       // optional
        eyeColor: { type: String,required:true },
        hairColor: { type: String,required:false },
        complexion: { type: String,required:true },   // fair / medium / dark
        build: { type: String,required:true },        // slim / average / fat / muscular
        beard: { type: String },        // No beard / light / full
        otherMarks: { type: String},   // tattoos, scars,injury marks etc.
    },
       approxAge: { type: Number,required:true },
       foundLocation: {
       type: { type: String, enum: ["Point"], default: "Point" },
       coordinates: { type: [Number], required: false }
   },

       rekognitionFaceId: { type: String },


     notes: { type: String },

     createdAt: { type: Date, default: Date.now },

    // Finder (User)
     finder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Optional match to uploaded missing person in DB 
    possibleMatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UploadMissingPerson",
      default: null
    }
  },
  { timestamps: false }
);

export default mongoose.model("SearchMissingPerson", SearchMissingPersonSchema);
