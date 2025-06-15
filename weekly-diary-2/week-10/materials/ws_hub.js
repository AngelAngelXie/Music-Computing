const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 9080 });
console.log("WebSocket hub running on ws://localhost:9080");

wss.on("connection", (ws) => {
  console.log("Performer connected!");

  ws.on("message", (msg) => {
    console.log("Received: ", msg.toString())
    // Broadcast to all others
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        console.log("message forwarded to client...");
        client.send(msg);
      }
    }
  });
});
