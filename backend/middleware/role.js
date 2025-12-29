export const role = (required) => (req, res, next) => {
  if (req.user.role !== required) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

