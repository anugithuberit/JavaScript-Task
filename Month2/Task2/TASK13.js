const fs = require("fs").promises;

function fetchUserData(id) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching user ${id}...`);
    setTimeout(() => {
      if (id > 10) {
        reject("User not found");
      } else {
        resolve({
          id,
          name: "Arun",
          email: "arunmail.com" 
        });
      }
    }, 400);
  });
}

function validateUser(user) {
  return new Promise((resolve, reject) => {
    console.log("Validating email...");
    setTimeout(() => {
      if (!user.email.includes("@")) {
        reject("Invalid email");
      } else {
        resolve(user);
      }
    }, 200);
  });
}

function enrichUser(user) {
  return new Promise((resolve) => {
    console.log("Enriching user data...");
    setTimeout(() => {
      user.role = "admin";
      user.joinedAt = new Date().toISOString();
      resolve(user);
    }, 300);
  });
}

async function saveUser(user, retry = true) {
  console.log("Saving to users.json...");
  try {
    await new Promise((res) => setTimeout(res, 200));

    if (Math.random() < 0.5 && retry) {
      throw new Error("Save failed");
    }

    await fs.writeFile("users.json", JSON.stringify(user, null, 2));
    return "Saved";

  } catch (err) {
    if (retry) {
      console.log("Retrying save...");
      return saveUser(user, false); // retry once
    } else {
      throw err;
    }
  }
}

async function runPipeline(id) {
  try {
    let user = await fetchUserData(id);

    try {
      user = await validateUser(user);
    } catch (err) {
      console.log("Validation failed, using default user...");
      user = {
        id,
        name: "Default User",
        email: "default@mail.com"
      };
    }

    user = await enrichUser(user);

    await saveUser(user);

    console.log("Done:", {
      id: user.id,
      name: user.name,
      role: user.role
    });

  } catch (err) {
    console.log("Error:", err);
  }
}

runPipeline(5);