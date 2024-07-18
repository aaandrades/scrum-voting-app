import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as httpCreateServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { initializeSockets } from "./src/server/sockets.js";

const app = express();
const httpServer = httpCreateServer(app);
const io = new SocketIOServer(httpServer);

app.use(
  express.static(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist/client"),
    { index: false }
  )
);

app.use("*", async (_, res) => {
  try {
    const template = fs.readFileSync("./dist/client/index.html", "utf-8");
    const { render } = await import("./dist/server/entry-server.js");

    const html = template.replace(`<!--outlet-->`, render);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

initializeSockets(io);

httpServer.listen(process.env.PROD_PORT, () => {
  console.log("Server is running at: ", 5000);
});
