import express from "express";
import { db } from "../db.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, (req, res) => {
  const { title, content, type, source } = req.body;

  db.run(
    `INSERT INTO submissions 
     (title, content, type, source, status, authorId)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, content, type, source, "pending", req.user.id],
    () => res.json({ success: true })
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

