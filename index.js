import express from "express";
import cors from "cors";
import {} from "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";
import routes from "./route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3031;

global.__basedir = __dirname;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log(`Gateway http://localhost:${port}`);
});
