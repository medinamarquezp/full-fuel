import express from "express";
import helmet from "helmet";
import { Server } from "./Server";
import { routerHandler } from "./routes/routerHandler";

const app = express();
app.use(helmet());
app.use(express.json());

const api = routerHandler(app);
const server = new Server(api);
server.start();
