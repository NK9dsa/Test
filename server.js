import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ อนุญาต cross-origin
app.use(cors());

// ✅ ตั้งค่าโฟลเดอร์อัพโหลด
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ Route upload
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("📸 Upload success:", req.file.filename);
  res.json({ message: "Upload success", file: req.file.filename });
});

// ✅ Route test
app.get("/", (req, res) => {
  res.send("🚀 Timestamp Camera Server is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
