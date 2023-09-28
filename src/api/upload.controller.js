import fs from "fs";
import uploadFile from "../middleware/upload.js";

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).json({ error: "Hãy chọn một file!" });
    }
    incrementVersion();
    return res.status(200).json({
      message: "Upload thành công file: " + req.file.originalname,
    });
  } catch (err) {
    return res.status(500).json({
      error: `Error (17): ${err}`,
    });
  }
};

const incrementVersion = () => {
  const directoryPath = __basedir + "/data/version.txt";

  fs.readFile(directoryPath, "utf8", (err, data) => {
    if (err) {
      console.error("Lỗi đọc tệp(32):", err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const currentVersion = jsonData;

      const newVersion = currentVersion + 1;

      fs.writeFile(directoryPath, JSON.stringify(newVersion), (err) => {
        if (err) {
          console.error("Lỗi ghi tệp(44):", err);
          return;
        }
        console.log("Phiên bản đã được tăng lên:", newVersion);
      });
    } catch (jsonError) {
      console.error("Lỗi xử lý dữ liệu JSON (50):", jsonError);
    }
  });
};

const getVersion = (req, res) => {
  const directoryPath = __basedir + "/data/version.txt";

  fs.readFile(directoryPath, "utf8", (err, data) => {
    if (err) {
      console.error("Lỗi đọc tệp:", err);
      return res.status(500).json({
        error: "Lỗi đọc tệp:",
      });
    }

    try {
      const jsonData = JSON.parse(data);
      return res.status(200).json(jsonData);
    } catch (jsonError) {
      return res.status(500).json({
        error: jsonError,
      });
    }
  });
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/data/save/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).json({
        error: "Không tìm thấy file (82)!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: "/data/save/" + file,
      });
    });

    if (fileInfos.length == 0) {
      console.log(directoryPath);
      return res.status(500).json({
        error: "Không tìm thấy file!",
      });
    } else {
      return res.status(200).json(fileInfos);
    }
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/data/save/";

  return res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      return res.status(500).json({
        error: "Lỗi (109): " + err,
      });
    }
  });
};

export { upload, getVersion, getListFiles, download };
