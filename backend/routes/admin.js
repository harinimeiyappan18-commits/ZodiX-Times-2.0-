import express from "express";
import { db } from "../db.js";
import { auth } from "../middleware/auth.js";
import { role } from "../middleware/role.js";

const router = express.Router();

router.get("/submissions", auth, role("admin"), (_, res) => {
  db.all("SELECT * FROM submissions", (_, rows) => res.json(rows));
});

router.post("/review/:id", auth, role("admin"), (req, res) => {
  const { status } = req.body;

  db.run(
    "UPDATE submissions SET status=? WHERE id=?",
    [status, req.params.id],
    () => res.json({ success: true })
  );
});

export default router;

