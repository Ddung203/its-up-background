import fs from "fs";
import uploadFile from "../middleware/upload.js";

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).json({ message: "Hãy chọn một file!" });
    }
    incrementVersion();
    res.status(200).json({
      message: "Upload thành công file: " + req.file.originalname,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).json({
        message: "File size cannot be larger than 11MB!",
      });
    }
    res.status(500).json({
      message: `Could not upload the file (22): ${err}`,
    });
  }
};

const incrementVersion = () => {
  const directoryPath = __basedir + "/version.txt";

  fs.readFile(directoryPath, "utf8", (err, data) => {
    if (err) {
      console.error("Lỗi đọc tệp:", err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const currentVersion = jsonData;

      // Tăng version
      const newVersion = currentVersion + 1;

      // Lưu version mới vào tệp version.txt
      fs.writeFile(directoryPath, JSON.stringify(newVersion), (err) => {
        if (err) {
          console.error("Lỗi ghi tệp:", err);
          return;
        }
        console.log("Phiên bản đã được tăng lên:", newVersion);
      });
    } catch (jsonError) {
      console.error("Lỗi xử lý dữ liệu JSON:", jsonError);
    }
  });
};

const getVersion = (req, res) => {
  const directoryPath = __basedir + "/version.txt";

  fs.readFile(directoryPath, "utf8", (err, data) => {
    if (err) {
      console.error("Lỗi đọc tệp:", err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      res.status(200).json({
        version: jsonData,
      });
    } catch (jsonError) {
      res.status(500).json({
        error: jsonError,
      });
    }
  });
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/save/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).json({
        message: "Không tìm thấy file!",
      });
      return;
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: "/save/" + file,
      });
    });

    if (fileInfos.length == 0) {
      res.status(500).json({
        message: "Không tìm thấy file!",
      });
      return;
    } else {
      res.status(200).json(fileInfos);
    }
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/save/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).json({
        message: "Không thể tải xuống file. " + err,
      });
    }
  });
};

export { upload, getVersion, getListFiles, download };
