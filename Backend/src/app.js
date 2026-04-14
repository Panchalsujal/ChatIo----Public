import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.route.js"
import morgan from "morgan";
import cors from "cors";

const app = express();
app.set("trust proxy", 1);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
    origin: "https://chatio-frontend-equl.onrender.com",
    credentials: true,
    methods: [ "GET", "POST", "PUT", "DELETE" ],
}))
// Health check



app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/chats",chatRouter);


export default app;
