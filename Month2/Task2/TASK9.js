const fs = require("fs").promises;
async function fetchRemoteData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { id: 1, value: "A" },
        { id: 2, value: "B" }
      ];
      console.log("Remote fetched: 2 records");
      resolve(data);
    }, 600);
  });
}
async function fetchLocalData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { id: 2, value: "OLD_B" }, // conflict
        { id: 3, value: "C" }
      ];
      console.log("Local fetched: 2 records");
      resolve(data);
    }, 400);
  });
}
async function syncData(remote, local) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const map = new Map();

      // Add local first
      local.forEach(item => map.set(item.id, item));

      let conflictCount = 0;
      remote.forEach(item => {
        if (map.has(item.id)) conflictCount++;
        map.set(item.id, item);
      });

      const result = Array.from(map.values());

      console.log(`Synced: ${result.length} records (${conflictCount} conflict resolved)`);
      resolve(result);
    }, 300);
  });
}
async function saveResult(data) {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      await fs.writeFile("sync.json", JSON.stringify(data, null, 2));
      console.log("Saved to sync.json");
      resolve();
    }, 200);
  });
}
async function runPipeline() {
  try {
    // Run both fetches in parallel
    const [remote, local] = await Promise.all([
      fetchRemoteData(),
      fetchLocalData()
    ]);

    const syncedData = await syncData(remote, local);
    await saveResult(syncedData);

  } catch (error) {
    console.error("Error:", error);
  }
}

runPipeline();