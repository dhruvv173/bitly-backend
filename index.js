import express from "express";
import dotenv from "dotenv";
import createUrl from "./services/createUrl.js";
import getUrl from "./services/getUrl.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello from Render!");
});
app.post("/api/create", createUrl);
app.get("/api/:shortId", getUrl);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
