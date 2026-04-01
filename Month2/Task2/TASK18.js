function createTask(id, delay) {
  return () => {
    console.log(`Task ${id} started`);

    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Task ${id} done — ${delay}ms`);
        resolve();
      }, delay);
    });
  };
}
const delays = [600, 800, 1000, 500, 700, 900, 400, 1100, 650, 750];
const tasks = delays.map((delay, i) => createTask(i + 1, delay));

async function limitConcurrency(tasks, limit) {
  let running = 0;
  let index = 0;

  return new Promise(resolve => {
    function runNext() {
      
      if (index === tasks.length && running === 0) {
        return resolve();
      }

      while (running < limit && index < tasks.length) {
        const currentTask = tasks[index];
        index++;
        running++;

        currentTask().then(() => {
          running--;
          runNext(); 
        });
      }
    }

    runNext();
  });
}

async function runConcurrent() {
  console.time("Concurrent Time");
  await limitConcurrency(tasks, 3);
  console.timeEnd("Concurrent Time");
}

async function runSequential() {
  console.time("Sequential Time");

  for (const task of tasks) {
    await task();
  }

  console.timeEnd("Sequential Time");
}

(async () => {
  console.log("---- Running with Concurrency Limit (3) ----");
  await runConcurrent();

  console.log("\n---- Running Sequentially ----");
  await runSequential();
})();