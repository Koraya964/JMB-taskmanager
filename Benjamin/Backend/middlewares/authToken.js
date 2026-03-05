import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateToken = (req, res, next) => {
  // 1. Récupération du header 'Authorization'
  // Format standard : "Bearer <votre_token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Si pas de token, on renvoie une erreur 401 (Non autorisé)
  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Jeton manquant." });
  }

  // 2. Vérification de la validité du token
  const MY_SECRET = process.env.JWT_SECRET;
  jwt.verify(token, MY_SECRET, (err, userPayload) => {
    if (err) {
      // Si le token est corrompu ou expiré, erreur 403 (Interdit)
      return res.status(403).json({ message: "Jeton invalide ou expiré." });
    }

    // 3. Si tout est bon, on attache les infos de l'utilisateur à l'objet 'req'
    // Cela permet aux routes suivantes de savoir QUI est connecté
    req.user = userPayload;

    // On passe à la suite (la route protégée)
    next();
  });
};

export default authenticateToken;
