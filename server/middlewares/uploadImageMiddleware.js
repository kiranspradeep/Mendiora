const multer = require("multer");

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload/"); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + file.originalname;
      cb(null, uniqueSuffix);
    },
  });
  
  const upload = multer({ storage });

  module.exports=upload;