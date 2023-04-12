import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();

router.post("/singup", async (req, res) => {
  try {
    const {
      "first-name": name,
      "last-name": lastName,
      age,
      email,
      password,
    } = req.body;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      const admin = await userModel.create({
        name,
        lastName,
        age,
        email,
        password,
      });
      req.session.user = admin.email;
      req.session.rol = "admin";
      return res.send("Usuario registrado como ADMIN");
    }
    const newUser = await userModel.create({
      name,
      lastName,
      age,
      email,
      password,
    });
    req.session.user = newUser.email;
    req.session.rol = "usuario";
    res.send("usuario registrado");
  } catch (error) {
    res.send({ status: "error", payload: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email, password: password });
  if (!user) {
    res.send("Usuario no encontrado");
  } else {
    res.redirect("/products");
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.send("No se puede cerrar la sesion");
    } else {
      return res.redirect("/login");
    }
  });
});

export default router;
