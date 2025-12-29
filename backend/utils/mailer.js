import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASS
  }
});

export function sendMail(to, subject, html) {
  return transporter.sendMail({
    from: `"ZodiX-Times 🌌" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject,
    html
  });
}

