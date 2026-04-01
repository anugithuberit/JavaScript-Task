function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: id, name: "Arun" });
    }, 500);
  });
}

function getPosts(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Post 1", "Post 2", "Post 3"]);
    }, 400);
  });
}

function formatOutput(posts) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(posts.join(", "));
    }, 200);
  });
}

getUser(1)
  .then(user => {
    console.log("User:", user.name);
    return getPosts(user);
  })
  .then(posts => {
    return formatOutput(posts);
  })
  .then(result => {
    console.log("Posts:", result);
  })
  .catch(error => {
    console.log("Error:", error);
  });