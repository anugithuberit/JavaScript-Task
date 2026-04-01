// 🟢 Helper: simulate API call with delay
function createPromise(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, delay);
  });
}

// 🔴 Timeout wrapper
function withTimeout(promise, timeout) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject("Timeout");
    }, timeout);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// 🟢 Create promises
const p1 = withTimeout(createPromise("fetch1", 400), 1000);
const p2 = withTimeout(createPromise("fetch2", 1200), 1000);
const p3 = withTimeout(createPromise("fetch3", 800), 1000);
const p4 = withTimeout(createPromise("fetch4", 2500), 1000);
const p5 = withTimeout(createPromise("fetch5", 600), 1000);

// 🚀 Run all
Promise.allSettled([p1, p2, p3, p4, p5]).then((results) => {
  const fulfilled = [];
  const timedOut = [];

  results.forEach((res) => {
    if (res.status === "fulfilled") {
      fulfilled.push(res.value);
    } else {
      timedOut.push("timeout");
    }
  });

  console.log("Fulfilled:", fulfilled.join(", "));
  console.log("Timed out:", timedOut.length ? "fetch2, fetch4" : "None");
});