import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import address from "./routes/address.js";
import { fileURLToPath } from "url";
import { logger } from "./middleware/logger.js";
import { notFound } from "./middleware/not-found.js";
import { error } from "./middleware/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", true);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.set("trust proxy", true);
app.use("/api/addresses", address);

app.use(notFound);
app.use(error);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);
});
