import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// upload middleware for image
const storage = multer.diskStorage({
  destination: "uploads_search",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`)
  }
});

// const upload = multer({
//   storage: multer.memoryStorage(),
//     limits: { fileSize: 5 * 1024 * 1024 },
// });

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});




const searchRouter = express.Router();

searchRouter.post("/identify-plant", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageBuffer = fs.readFileSync(req.file.path);
    //  const imageBuffer = req.file.buffer;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
          You are a plant identification expert. Look at the plant in the image and respond ONLY in the following JSON format:
          {
            "name": "<plant common name or closest match>",
            "description": "<2–3 line description about its appearance, features, and growing conditions>"
          }
          Rules:
          - If uncertain, provide the closest possible match but DO NOT leave fields empty.
          - The response MUST always be valid JSON.
          - The description should be accurate and concise.
          - Do NOT include extra text outside the JSON.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: "image/jpeg",
        },
      },
    ]);
    console.log(result);
    res.json({ plant: result.response.text() });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

searchRouter.get("/", (req, res) => {
  res.send("API working!");
});


export default searchRouter;