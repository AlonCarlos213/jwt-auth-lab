import express from "express";
import cors from "cors";
import db from "./app/models/index.js";

// 🧭 Importa las rutas
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";

const app = express();

// 🌐 Configurar CORS (opcional si solo pruebas en localhost)
const corsOptions = {
  origin: "http://localhost:5173", // ✅ Puerto correcto para Vite
};

app.use(cors(corsOptions));

// 📦 Middleware para analizar cuerpos JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ruta simple para probar el servidor
app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a la API con JWT y roles." });
});

// 📂 Agrega rutas de autenticación y roles
app.use("/api/auth", authRoutes);     // /signup y /signin
app.use("/api/test", userRoutes);     // rutas protegidas según el rol

// 📦 Sincroniza modelos con base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log("📦 Tablas sincronizadas con la base de datos.");
});

// 🚀 Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
