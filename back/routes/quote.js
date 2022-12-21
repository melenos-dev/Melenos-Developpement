const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");

const quoteCtrl = require("../controllers/quote");

const auth = require("../middleware/auth");

router.get("/quiz", quoteCtrl.quoteQuiz);
router.post("/quiz/storeReplies", multer, quoteCtrl.quoteQuizStoreReplies);

module.exports = router;
