import express from "express";
import { db } from "../db.js";
import { auth } from "../middleware/auth.js";
import { role } from "../middleware/role.js";

const router = express.Router();

router.get("/submissions", auth, role("admin"), (_, res) => {
  db.all("SELECT * FROM submissions", (_, rows) => res.json(rows));
});

import { sendMail } from "../utils/mailer.js";

router.post("/review/:id", auth, role("admin"), (req, res) => {
  const { status } = req.body;
  const submissionId = req.params.id;

  db.get(
    `
    SELECT s.title, u.email 
    FROM submissions s
    JOIN users u ON s.authorId = u.id
    WHERE s.id = ?
    `,
    [submissionId],
    (_, row) => {
      if (!row) return res.status(404).json({ error: "Not found" });

      db.run(
        "UPDATE submissions SET status=? WHERE id=?",
        [status, submissionId],
        async () => {
          let subject = "ZodiX-Times Update 🌙";
          let message = "";

          if (status === "approved") {
            subject = "⭐ Your story is approved!";
            message = `
              <h2>⭐ Congratulations!</h2>
              <p>Your submission <strong>${row.title}</strong> has been approved and published on <b>ZodiX-Times</b>.</p>
              <p>Thank you for sharing your cosmic thoughts 🌌</p>
            `;
          }

          if (status === "rejected") {
            subject = "❌ Update on your submission";
            message = `
              <h2>💫 Keep going!</h2>
              <p>Your submission <strong>${row.title}</strong> wasn’t approved this time.</p>
              <p>Don’t be discouraged — we’d love to see more from you ✨</p>
            `;
          }

          if (status === "edits") {
            subject = "💫 Edits requested";
            message = `
              <h2>🌙 Almost there!</h2>
              <p>Your submission <strong>${row.title}</strong> needs a few edits before approval.</p>
              <p>Please revise and resubmit 🚀</p>
            `;
          }

          await sendMail(row.email, subject, message);
          res.json({ success: true });
        }
      );
    }
  );
});
