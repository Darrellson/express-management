const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prismaClient");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.header("Authorization", token).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { register, login };
