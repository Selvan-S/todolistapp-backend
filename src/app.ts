import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
// import TodoModel from "./models/todolist"; handled by controllers
import todoRoutes from "./routes/todoRoutes";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./controllers/middleware/auth";
// import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(morgan("dev"));

// app.use(cors());
app.use(
  cors({
    origin: [
      "https://2dolist-app.netlify.app",
      "https://todolist-fe.onrender.com",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true,
  })
);

// app.use(cors());
app.use(express.json());
app.set("trust proxy", 1);

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/todos", requiresAuth, todoRoutes);

app.use("/api/v1/tasks", taskRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
