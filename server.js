const express = require("express");
require("dotenv").config();

const qrcodeRoutes = require("./routes/qrcode-routes");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/qrcode", qrcodeRoutes);

server.listen(5000);

console.log("Listening to port 5000");
