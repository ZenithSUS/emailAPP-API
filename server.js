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
const PORT = process.env.PORT || 4000;
const app = express();

app.set('trust proxy', ['loopback']);
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
app.get("/favicon.ico", (req, res) => res.status(204).end());


app.use("/api/addresses", address);


app.use(notFound);
app.use(error);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);

});
