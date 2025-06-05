import db from "../db/client.js";

export default async function newUserCheck(req, res, next) {
  const { email } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      return res.status(409).json({ error: "User with this email already exists" });
    }
    next(); 
  } catch (err) {
    next(err);
  }
}
