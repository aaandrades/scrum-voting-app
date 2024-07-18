import fs from "fs";
import express from "express";
import { createServer } from "vite";
import { createServer as httpCreateServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { initializeSockets } from "./src/server/sockets.js";

const app = express();
const httpServer = httpCreateServer(app);
const io = new SocketIOServer(httpServer);

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

app.use(vite.middlewares);

app.use("*", async (req, res) => {
  const url = req.originalUrl;

  try {
    const template = await vite.transformIndexHtml(
      url,
      fs.readFileSync("index.html", "utf-8")
    );
    const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

    const html = template.replace(`<!--outlet-->`, render);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    console.log(error);
    res.status(500).end(error);
  }
});

initializeSockets(io);

httpServer.listen(process.env.DEV_PORT, () => {
  console.log("Server is running at", process.env.DEV_PORT);
});
