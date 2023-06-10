const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, "../uploads");
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4(); // Generate a unique filename
    cb(null, uniqueFilename);
  },
});

// Create multer instance with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;
