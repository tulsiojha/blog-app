import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import { IUser } from "./services/user.service";
import { authenticate } from "./middlewares/authenticate";
import postRouter from "./routes/post.routes";
import config from "./utils/config";
import tagRouter from "./routes/tag.routes";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}

const port = config.PORT || 4000;

const corsOptions = {
  origin: ["http://localhost:3000", "https://blog-app.ojhabikash.com.np"],
  credentials: true,
};

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json());

app.use("/post", authenticate, postRouter);
app.use("/tag", authenticate, tagRouter);
app.use("/auth", authRouter);
app.get("/healthy", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Server successfully started at port: ${port}`);
});
