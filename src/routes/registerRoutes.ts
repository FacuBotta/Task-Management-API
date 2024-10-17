import express from "express";
import * as authServices from "../services/authServices";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ error: "Email and password are required" });
    return;
  }
  try {
    await authServices.register(email, password);
    res.send({ status: "ok", message: "User added successfully" });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authServices.login(email, password);
    res.send({ token });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
