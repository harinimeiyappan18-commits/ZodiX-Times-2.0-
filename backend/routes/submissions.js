import express from "express";
import { db } from "../db.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

import { calculateOriginality } from "../utils/originality.js";

router.post("/", auth, (req, res) => {
  const { title, content, type, source } = req.body;

  db.all(
    "SELECT content FROM submissions",
    [],
    (_, rows) => {
      const texts = rows.map(r => r.content);
      const originality = calculateOriginality(content, texts);

      db.run(
        `INSERT INTO submissions 
         (title, content, type, source, status, originality, authorId)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          title,
          content,
          type,
          source,
          "pending",
          originality,
          req.user.id
        ],
        () => res.json({ success: true, originality })
      );
    }
  );
});


router.get("/mine", auth, (req, res) => {
  db.all(
    "SELECT * FROM submissions WHERE authorId=?",
    [req.user.id],
    (_, rows) => res.json(rows)
  );
});

export default router;

