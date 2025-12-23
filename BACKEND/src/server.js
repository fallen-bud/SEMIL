import dotenv from 'dotenv';
dotenv.config() 
import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import uploadAndSearchRoutes from "./Routes/SearchorMissingRoutes.js"
import connectDB from "./Database/db_config.js"
import authRoutes from "./Routes/UserRoutes.js";
import { ensureCollectionExists } from "./Services/rekognitionCollectionService.js";

const app = express();

connectDB();
app.use(cors());

app.use(express.json());


app.get('/',(req,res) => {
    res.send('Server is running');
});


ensureCollectionExists();

// app.listen(process.env.B_PORT,() => {
//   console.log(`🚀Backend Server running on http://localhost:${process.env.B_PORT}`);
// });


app.use("/api/auth", authRoutes);


app.use("/api/auth", uploadAndSearchRoutes);




app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});



export default app;