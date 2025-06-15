import * as Strudel from '@strudel/core';
import WebSocket from "ws";

// NOTE 1: Set your unique performer name
const performerName = process.argv[2] ?? "teddy the bear";

// Create a WebSocket connection
const socket = new WebSocket("ws://localhost:9080");

// Initialize Strudel with OSC target
// const s = new Strudel({ target: "osc" });

socket.on("open", () => {
  console.log(`Connected as ${performerName}`);

  // NOTE 2: Send your messages here
  socket.send(JSON.stringify({ from: performerName, type: "cue", value: "intro" }));
});

socket.on("message", (data) => {
  const msg = JSON.parse(data.toString());
  console.log(`${msg.from}:`, msg.value);

  // NOTE 3: Basic shared cue responses that you can modify as you like

  // Msg type 1: Shared entry to different phases of the music
  if (msg.type === "cue") {
    if (msg.value === "intro") {
      Strudel.s("bd ~ sn ~").gain(0.6).osc();
    } else if (msg.value === "drop") {
      Strudel.s("bd*4").gain(1.0).osc();
    } else if (msg.value === "break") {
      Strudel.s("~").gain(0.3).osc();
    }
  }

  // Msg type 2: Shared tempo change
  if (msg.type === "tempo") {
    s.tempo = parseFloat(msg.value);
  }
});

// // Example: send a new cue after 10 seconds
// setTimeout(() => {
//   socket.send(JSON.stringify({ from: performerName, type: "cue", value: "drop" }));
// }, 10000);
