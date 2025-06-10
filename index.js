import express from "express";
import dotenv from "dotenv";
import createUrl from "./services/createUrl.js";
import getUrl from "./services/getUrl.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Service is live 🎉");
});
app.get("/api", (req, res) => {
  res.status(401).json({ error: "Unauthorized Access" });
});
app.get("/api/healthz", (req, res) => {
  res.status(200).json({ status: "healthy" });
});
app.post("/api/create", createUrl);
app.get("/:shortId", getUrl);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
