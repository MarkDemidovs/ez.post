// May Jesus Christ bless all of those who read this code.


import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Post } from "./models/postModel.js";
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).json({ message: "welcome" });
});

// Route for saving a new post
app.post("/posts", async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).send({
        message: "Send all required fields: title, content",
      });
    }
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    };

    const post = await Post.create(newPost);

    return res.status(201).send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for getting all post from database
app.get("/posts", async (req,res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).send({message: err.message})
    }
})

// shouldnt be used that much except for requests:
// deleting posts

app.delete("/posts/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const result = await Post.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({message: "The ID for the post was not found."})
        } else {
            return res.status(200).send({message: `Post with the ID of ${id} was deleted.`})
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

app.delete("/posts", async (req, res) => {
  try {
    await Post.deleteMany(); // Deletes all posts
    return res.status(200).send({ message: "All posts have been deleted." });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});


mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to database.");

    app.listen(PORT, () => {
      console.log("listening to port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
