import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend de ABISMO funcionando",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
