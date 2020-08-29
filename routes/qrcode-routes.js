const express = require("express");

const qrcodeController = require("../controllers/qrcode-controller");
const router = express.Router();

router.post("/", qrcodeController.generateQRCode);

router.get("/", qrcodeController.randomString);

module.exports = router;
