// initializes Multer Storage engine and defines middleware function to save uploaded files in uploads folder.
import util from "util";
import multer from "multer";

const maxSize = 11 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__basedir}/save/`);
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const lastDot = originalFileName.lastIndexOf(".");
    const ext = originalFileName.substring(lastDot + 1);
    const newFileName = `background.${ext}`;
    cb(null, newFileName);
    // cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
}).single("file");

const uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFileMiddleware;
