import express from "express";
import * as uploadController from "./upload.controller.js";

const router = express.Router();

router.route("/upload").post(uploadController.upload);
router.route("/version").get(uploadController.getVersion);
router.route("/file").get(uploadController.getListFiles);
router.route("/download/:name").get(uploadController.download);

export default router;
