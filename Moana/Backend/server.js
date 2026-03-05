// ================================================================================
//                  SERVEUR EXPRESS
// ================================================================================

// ----------------- Importation des modules --------------------------------------

import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import path from "node:path";
import authRoutes from "./routes/authRoute.js";


// ------------- activation des fonctionnalités ------------------------------------ 

// création instance Express = (application principale)
const app = express();
// permet la discussion entre frontend et backend
app.use(cors());
// permet de sécurisé les headers de requête (HTTP)
app.use(helmet());
// permet la lecture de donnée JSON
app.use(express.json());
// permet la lecture des formulaire HTML
app.use(express.urlencoded({ extended: true }));
// création d'un chemin absolu vers le dossier frontend utilisable par le navigateur
app.use(express.static(path.join(import.meta.dirname,"../Frontend")))
app.use("/users", authRoutes);

// ----------------------- Routes vers le front -------------------------------------------------

// users/registers
app.get("/", (req, res) => {
res.sendFile(path.join(import.meta.dirname,"../Frontend","/pages/register.html"))
}
);

// users/register
app.get("/login", (req, res) => {
res.sendFile(path.join(import.meta.dirname,"../Frontend","/pages/login.html"))
}
);

// a créer
app.get("/list", (req, res) => {
res.sendFile(path.join(import.meta.dirname,"../Frontend","/pages/tasklist.html"))
}
);

// ------------------- Démarrage serveur -----------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
