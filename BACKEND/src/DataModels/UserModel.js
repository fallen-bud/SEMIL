import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

 const userSchema = new Schema({
    Username : 
    { type : String,required : true,trim : true,lowercase : true,index:true,unique:true},
    Name: 
    { type: String, required: true },
    Number: 
    { type: String, required: true, unique: true },
    Password: 
    { type: String, required: true },
    Address: 
    { type: String, required: true },

    // Virtual auto timestamp equivalent to createdAt default NOW()
    createdAt: { type: Date, default: Date.now },

    // Relations (ONE-TO-MANY)
    missingReports: [
      { type: mongoose.Schema.Types.ObjectId, ref: "UploadMissingPerson" }
    ],
    searchReports: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SearchMissingPerson" }
    ],
    refreshToken: {
            type: String
        }},
 
    {timestamps : true});


    userSchema.pre('save',async function (next){
        if(!this.isModified('Password')) return next();
        
        this.Password = await bcrypt.hash(this.Password,10)
    })

    userSchema.methods.isPasswordCorrect = async function(Password){
    return await bcrypt.compare(Password, this.Password)
}

    userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            Username: this.Username,
            Name: this.Name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

    userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export default mongoose.model("User",userSchema);