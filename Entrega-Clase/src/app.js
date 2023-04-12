import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import viewsRouter from "./routes/views.router.js";
import authRouter from "./routes/auth.router.js";

const app = express();
const port = 8080;
const urlDB =
  "mongodb+srv://alexisjrbwork:blTyiBGV3yxMhFcb@codercluster.7y4c97s.mongodb.net/entrega-C-20?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//C. Session

app.use(
  session({
    store: MongoStore.create({ mongoUrl: urlDB }),
    secret: "mi-secreto",
    resave: true,
    saveUninitialized: true,
  })
);

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Routes
app.use("/", viewsRouter);
app.use("/api/session", authRouter);

//Connection Mongoose to MongoDB
mongoose.connect(urlDB);

app.listen(port, () => console.log(`Server listening on port ${port}`));
