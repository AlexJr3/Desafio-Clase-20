import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();

router.post("/singup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await userModel.create({ email, password });
    req.session.user = newUser.email;
    res.status(200).redirect("/profile");
  } catch (error) {
    res.send({ status: "error", payload: error.message });
  }
});

export default router;
