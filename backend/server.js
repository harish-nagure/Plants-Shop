import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import plantRouter from './routes/plantRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'; 
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import searchRouter from './routes/searchRoute.js';

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDb();

//API endpoints
app.use("/api/plant",plantRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/search",searchRouter);


app.get("/",(req,res)=>{
    res.send("API working !");
})


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // upload middleware for image

// const storage = multer.diskStorage({
//     destination:"uploads_search",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// // ----------- IDENTIFY PLANT (GEMINI) -----------
// app.post("/identify-plant", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No image uploaded" });
//     }

//     // const imageBuffer = fs.readFileSync(req.file.path);
//      const imageBuffer = req.file.buffer;

//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const result = await model.generateContent([
//       "Identify this plant and describe it in 2–3 lines.",
//       {
//         inlineData: {
//           data: imageBuffer.toString("base64"),
//           mimeType: "image/jpeg",
//         },
//       },
//     ]);
//     console.log(result);
//     res.json({ plant: result.response.text() });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})



