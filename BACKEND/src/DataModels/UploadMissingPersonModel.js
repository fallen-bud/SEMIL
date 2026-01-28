import mongoose,{Schema} from 'mongoose';


 const UploadMissingPersonSchema = new Schema({ 
    
    name:
     { type: String, required: true },
    age:
     { type: Number },
    location: {
          type: { type: String, enum: ["Point"], default: "Point" },
          coordinates: { type: [Number], required: true }
     },
    gender: { type: String, required: false, enum: ["male", "female", "other"] },

    bodyFeatures: {
    height: String,
    weight: String,
    eyeColor: String,
    hairColor: String,
    complexion: String,
    build: String,
    beard: String,
    otherMarks: String
},
    

    costume:
     { type: String },
    markOnBody:
     { type: String },

    photoUrl:
     { type: String, required: true },

    faceId:
    { type :  String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // Who reported it
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // List of related search reports
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SearchMissingPerson"
      }
    ]},
    
    {timestamps : true});

    export default mongoose.model("UploadMissingPerson",UploadMissingPersonSchema);