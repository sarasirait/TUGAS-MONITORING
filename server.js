const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ping = require('ping');
const Datastore = require('nedb-promises');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Database logs
const db = Datastore.create({
  filename: path.join(__dirname, "logs.db"),
  autoload: true
});

// Static files
app.use(express.static("public"));

let devices = [
  { id: 1, name: "Router", ip: "192.168.1.1", status: "unknown", bandwidth: 0 },
  { id: 2, name: "Switch", ip: "192.168.1.2", status: "unknown", bandwidth: 0 },
  { id: 3, name: "Access Point", ip: "192.168.1.3", status: "unknown", bandwidth: 0 }
];

// PING tiap 3 detik
setInterval(async () => {
  for (let d of devices) {
    const res = await ping.promise.probe(d.ip);
    d.status = res.alive ? "online" : "offline";
    d.bandwidth = Math.floor(Math.random() * 100);

    if (!res.alive) {
      await db.insert({
        device: d.name,
        alert: "Device Offline!",
        time: new Date()
      });
    }
  }

  io.emit("update", devices);
}, 3000);

// API logs
app.get("/api/logs", async (req, res) => {
  const logs = await db.find({}).sort({ time: -1 }).limit(40);
  res.json(logs);
});

// Server run
const PORT = 3000;
server.listen(PORT, () => console.log("Running at http://localhost:" + PORT));
