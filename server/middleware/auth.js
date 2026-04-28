import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ success:false, message:"Unauthorized" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload || payload.role !== "admin") return res.status(403).json({ success:false, message:"Forbidden" });
    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ success:false, message:"Invalid token" });
  }
}
