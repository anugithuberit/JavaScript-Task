const EventEmitter = require("events");
const fs = require("fs");

const emitter = new EventEmitter();
emitter.on("dataReceived", async (data) => {
  console.log("dataReceived →", data);

  // validate
  if (data && typeof data.value === "number") {
    console.log("dataValid     → validation passed");
    emitter.emit("dataValid", data);
  } else {
    console.log("dataInvalid   → invalid data");
  }
});
emitter.on("dataValid", async (data) => {
  // simulate async work
  await new Promise(res => setTimeout(res, 300));

  const transformed = {
    ...data,
    value: data.value * 2
  };

  console.log("dataProcessed →", transformed);

  emitter.emit("dataProcessed", transformed);
});
emitter.on("dataProcessed", async (data) => {
  await new Promise(res => setTimeout(res, 200));

  fs.writeFile("result.txt", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing file");
      return;
    }

    console.log("dataSaved     → written to result.txt");
    emitter.emit("dataSaved");
  });
});
emitter.emit("dataReceived", { id: 1, value: 42 });