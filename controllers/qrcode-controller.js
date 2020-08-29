const qrcode = require("qrcode");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateQRCode = async (req, res, next) => {
  const { value, recipient } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_EMAIL,
      //pass: process.env.GOOGLE_PASSWORD,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    },
  });

  let id;
  try {
    id = crypto.randomBytes(20).toString("hex");
    await qrcode.toFile(`./qrcodes/${id}.png`, value);
  } catch (err) {
    console.log(err);
  }

  let mailOptions = {
    from: `Quicker Oats <${process.env.GOOGLE_EMAIL}>`,
    to: recipient,
    subject: "Generated QR Code from Quicker Oats",
    text:
      "Good day! Attached here is your QR Code that you can use to avail our services. Thank you for registering to Quicker Oats! This message is auto-generated. Please do not reply.",
    html:
      "<p>Good day!</p> <p>Attached here is your QR Code that you can use to avail our services.</p> <p>Thank you for registering to Quicker Oats!</p> <em>This message is auto-generated. Please do not reply.</em>",
    attachments: [{ path: `./qrcodes/${id}.png` }],
  };

  let info;
  try {
    info = await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({
    messgae: `Email successfully sent with QR Code. ID: ${info.messageId}. Response: ${info.response}`,
  });
};

const randomString = (req, res, next) => {
  let randomized = crypto.randomBytes(4);
  res.status(201).json({ value: randomized.toString("base64") });
};

exports.generateQRCode = generateQRCode;
exports.randomString = randomString;

// https://www.youtube.com/watch?v=JJ44WA_eV8E
