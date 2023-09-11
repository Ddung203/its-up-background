import express from "express";
import upload from "./src/api/upload.route.js";

const router = express.Router();
router.get("/check", (req, res) => {
  res.send("Check OK");
});

router.use("/", upload);

export default router;
