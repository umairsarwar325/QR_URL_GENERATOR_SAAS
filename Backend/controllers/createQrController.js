const express = require("express");
const axios = require("axios");
const User = require("../models/usersModel");
const Plan = require("../models/planModel");
const Usage = require("../models/usageModel");
const QRCode = require("../models/qrCodeModel");

const qrController = async function (req, res, next) {
  try {
    const {
      text,
      format,
      captionFontSize,
      captionFontFamily,
      caption,
      ecLevel,
      dark,
      size,
      margin,
      light,
      centerImageUrl,
      centerImageSizeRatio,
      centerImageWidth,
      centerImageHeight,
    } = req.body;

    if (!text) {
      return res.json({
        qrSuccess: false,
        message: "Text is required",
      });
    }
    const user = await User.findOne({ Email: "test1@test.com" });
    const usage = await Usage.findOne({ UserID: user._id });
    const plan = await Plan.findOne({ _id: user.PlanID });

    if (usage.QRCodeCount >= plan.QRCodeLimit) {
      return res.json({
        qrSuccess: false,
        message:
          "Qr Code limit exceeded. Please upgrade your subscription plan",
      });
    }

    let contentType;
    if (format === "svg") {
      contentType = "image/svg+xml";
    } else if (format === "base64") {
      contentType = "text/plain";
    } else {
      contentType = "image/png";
    }
    const queryParams = new URLSearchParams({
      text: text,
      caption: caption || "",
      margin: margin || "4",
      format: format || "png",
      size: size || "150",
      caption: caption || "",
      captionFontSize: captionFontSize || "",
      captionFontFamily: captionFontFamily || "",
      ecLevel: ecLevel || "",
      dark: dark || "",
      light: light || "",
      centerImageUrl: centerImageUrl || "",
      centerImageSizeRatio: centerImageSizeRatio || "",
      centerImageWidth: centerImageWidth || "",
      centerImageHeight: centerImageHeight || "",
    });

    const response = await axios.get(
      `https://quickchart.io/qr?${queryParams.toString()}`,
      {
        responseType: "arraybuffer",
      }
    );

    if (response) {
      const imageBase64 = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      const imageSrc = `data:${contentType};base64,${imageBase64}`;

      if (user && usage && plan) {
        const newQr = await QRCode.create({
          UserID: user._id,
          URL: imageSrc,
        });
        if (newQr) {
          user.QRCodes.push(newQr._id);
          usage.QRCodeCount += 1;
          await user.save();
          await usage.save();
          return res.json({
            qrSuccess: true,
            imageSrc: newQr.URL,
            message: "QR code generated successfully",
          });
        }
      } else {
        return res.json({
          qrSuccess: false,
          message: "Failed to generate QR code",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      qrSuccess: false,
      message: "Internel server error",
    });
  }
};

module.exports = qrController;
