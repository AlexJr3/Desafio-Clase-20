import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", async (req, res) => {
  const sessionData = req.session;
  console.log(sessionData.user);
  const userData = await userModel.findOne({ email: sessionData.user });
  console.log(userData);
  res.render("profile", { sessionData, userData });
});

router.get("/products", async (req, res) => {
  const sessionData = req.session;
  const userData = await userModel.findOne({ email: sessionData.email });

  res.render("products", { sessionData, userData });
});

export default router;
