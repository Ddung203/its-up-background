import util from "util";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__basedir}/data/save/`);
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const lastDot = originalFileName.lastIndexOf(".");
    const ext = originalFileName.substring(lastDot + 1);
    const newFileName = `background.${ext}`;
    cb(null, newFileName);
  },
});

const uploadFile = multer({
  storage,
}).single("file");

const uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFileMiddleware;
