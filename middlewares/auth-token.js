import jwt from "jsonwebtoken";

export const fetchAuthToken = (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  if (!token) return res.status(401).json({ message: "User is unauthorized." });

  try {
    const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN_KEY);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};