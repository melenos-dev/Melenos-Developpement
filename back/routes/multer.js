const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("posts/upload", auth, multer);

module.exports = router;
