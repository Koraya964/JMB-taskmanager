import "dotenv/config";
import express from "express";
import path from "path";
import user_routes from "./routes/authRoute.js";
import authToken from "./middlewares/authToken.js";

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "../Frontend")));

app.use("/users", user_routes);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(import.meta.dirname, "../Frontend", "/pages/login.html"),
  );
});

app.get("/list", (req, res) => {
  res.sendFile(
    path.join(import.meta.dirname, "../Frontend", "/pages/list.html"),
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
