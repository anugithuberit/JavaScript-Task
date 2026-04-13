const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

let posts = [
  {
    id: 1,
    title: "Express Basics",
    content: "Introduction to Express framework",
    author: "Sai"
  },
  {
    id: 2,
    title: "Node.js Guide",
    content: "Learn Node step by step",
    author: "Anu"
  }
];

function getTimestamp() {
  return new Date().toISOString();
}

app.get('/posts', (req, res) => {
  res.status(200).json({
    message: "All blog posts",
    totalPosts: posts.length,
    timestamp: getTimestamp(),
    data: posts
  });
});

app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    console.log("Validation failed");
    return res.status(400).json({
      error: "Title, content and author are required"
    });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author
  };

  posts.push(newPost);

  console.log("Post created");

  res.status(201).json({
    message: "Post created successfully",
    post: newPost
  });
});

app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log("Updating post ID:", id);

  const { title, content, author } = req.body;

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({
      error: "Post not found"
    });
  }

  if (!title || !content || !author) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  post.title = title;
  post.content = content;
  post.author = author;

  res.status(200).json({
    message: "Post updated successfully",
    post
  });
});

app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log("Deleting post ID:", id);

  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Post not found"
    });
  }

  const deletedPost = posts.splice(index, 1);

  res.status(200).json({
    message: "Post deleted successfully",
    post: deletedPost[0]
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    status: 404,
    timestamp: getTimestamp()
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});