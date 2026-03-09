// ================================================================================
//                  SERVEUR EXPRESS 
// ================================================================================

// mode ES Modules (import au lieu de require)

// ----------------- Importation des modules --------------------------------------

import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { fileURLToPath } from "node:url";
import path from "node:path";
import authRoutes from "./src/routes/authRoute.js";
import taskRoutes from "./src/routes/taskRoute.js";
import cookieParser from "cookie-parser";


// ------------- activation des fonctionnalités ------------------------------------ 

// création instance "__dirname"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// création instance Express = (application principale)
const app = express();

// permet la discussion entre frontend et backend
app.use(cors());
// permet de sécurisé les headers de requête (HTTP) 
// suite erreur favicon = reconfiguration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"]
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "same-site" }
  })
);

// permet la lecture de donnée JSON
app.use(express.json());
// permet la lecture des formulaire HTML
app.use(express.urlencoded({ extended: true }));
// création du chemin absolu rendant accessible le dossier "public"
app.use(express.static(path.join(__dirname, "public")));
// parsing de cookies
app.use(cookieParser())

// routes API
app.use("/users", authRoutes);
app.use("/tasks", taskRoutes);
// ----------------------- Routes vers le front -------------------------------------------------

// route "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/register.html"))
});

// route "/login"
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/login.html"))
});

// route "/list"
app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/tasklist.html"))
});

// ------------------- Démarrage serveur -----------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port http://localhost:${PORT}`);
});
