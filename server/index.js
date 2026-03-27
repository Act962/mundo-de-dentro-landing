import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "../public");
const CONTENT_PATH = path.join(DATA_DIR, "content.json");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const JWT_SECRET = process.env.JWT_SECRET || "mundo-de-dentro-secret-key";

// Mock user for simple auth
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(
  process.env.ADMIN_PASSWORD || "admin123",
  10,
);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));

// Ensure data directory exists
await fs.mkdir(UPLOADS_DIR, { recursive: true }).catch(() => {});

try {
  await fs.access(CONTENT_PATH);
} catch {
  console.log("Initializing content.json in data directory...");
  // Default to public/content.json if available
  const publicContentPath = path.join(__dirname, "../public/content.json");
  try {
    const data = await fs.readFile(publicContentPath, "utf-8");
    await fs.writeFile(CONTENT_PATH, data, "utf-8");
  } catch (error) {
    // Basic fallback if everything fails
    await fs.writeFile(
      CONTENT_PATH,
      JSON.stringify({ hero: {}, team: {} }, null, 2),
      "utf-8",
    );
  }
}

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (
    username === ADMIN_USER &&
    bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)
  ) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "24h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Credenciais inválidas" });
});

// Content Routes
app.get("/api/content", async (req, res) => {
  try {
    const data = await fs.readFile(CONTENT_PATH, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao ler conteúdo", error: error.message });
  }
});

app.put("/api/content", authenticateToken, async (req, res) => {
  try {
    const newContent = req.body;
    await fs.writeFile(
      CONTENT_PATH,
      JSON.stringify(newContent, null, 2),
      "utf-8",
    );
    res.json({ message: "Conteúdo atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao salvar conteúdo", error: error.message });
  }
});

// Upload Routes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post(
  "/api/upload",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  },
);

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
  const DIST_PATH = path.join(__dirname, "../dist");
  app.use(express.static(DIST_PATH));

  // Alterado de '*' para '(.*)' para compatibilidade com Express 5
  app.get("(.*)", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads"))
      return next();
    res.sendFile(path.join(DIST_PATH, "index.html"));
  });
}
