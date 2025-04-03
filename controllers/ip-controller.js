import nodemailer from "nodemailer";
import { content } from "../utils/email-content.js";

const testEmails = ["dan.reyes@seiwakaiun.com.ph", "jeranmerino147@gmail.com"];

const transporter = nodemailer.createTransport({
  host: "mail.seiwakaiun.com.ph",
  port: 465, 
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.WEBCOM_EMAIL, // Your Web.com.ph email (e.g., user@web.com.ph)
    pass: process.env.WEBCOM_APP_PASSWORD, // App password or main password
  },
  tls: {
    rejectUnauthorized: false, // Only disable if facing SSL issues
  },
});

const sendEmail = (email, subject, text, html) => {
  const mailOptions = {
    from: process.env.WEBCOM_EMAIL, // Sender must be a Web.com.ph email
    to: email,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const sendToAll = (req, res) => {
  try {
    testEmails.forEach((email) => {
      sendEmail(email, "Update your account", "This is a test message.", content(email));
    });
    return res.status(200).json({
      status: res.statusCode,
      message: "Sent Successfully"
    });
    
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: "There is something wrong sending the message"
    })
  }
};