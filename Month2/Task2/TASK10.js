const fs = require("fs");

const start = Date.now();

// Helper to print elapsed time
function log(phase) {
  const elapsed = Date.now() - start;
  console.log(`[${elapsed}ms] ${phase}`);
}

/*
Event Loop Order (simplified):
1. Sync (call stack)
2. process.nextTick() → microtask (highest priority)
3. Promise.then() → microtask
4. Timers (setTimeout)
5. I/O callbacks (fs.readFile)
6. Check phase (setImmediate)
*/

log("Sync — call stack");
process.nextTick(() => {
  log("nextTick — microtask queue");
});
Promise.resolve().then(() => {
  log("Promise — microtask queue");
});
setTimeout(() => {
  log("setTimeout — timers phase");
}, 0);
setImmediate(() => {
  log("setImmediate — check phase");
});
fs.readFile(__filename, () => {
  log("fs.readFile — I/O callbacks phase");
});