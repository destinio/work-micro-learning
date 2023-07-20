import express from "express";
import cors from "cors";

const PORT = 4002;

const posts: any = [];
const comments: any = [];

enum EventType {
  PostCreated = "PostCreated",
  CommentCreated = "CommentCreated",
}

const app = express();
app.use(cors());

app.use(express.json());

// posts
app.get("/posts", (req, res) => {
  const postsForResponse = posts.map((post: any) => {
    return {
      ...post,
      comments: comments.filter((comment: any) => comment.postId === post.id),
    };
  });

  res.send(postsForResponse);
});
app.get("/posts/:id", (req, res) => {
  const post = posts.map((post: any) => {
    return {
      ...post,
      comments: comments.filter((comment: any) => comment.postId === post.id),
    };
  });

  res.send(post);
});

// comments
app.get("/comments", (req, res) => {
  res.send(comments);
});

app.get("/comments/:id", (req, res) => {
  const commet = comments.find((comment: any) => comment.id === req.params.id);
  if (!commet) {
    return res.status(404).send({ msg: "Comment not found" });
  }
  res.send(commet);
});

// events from event bus
app.post("/events", (req, res) => {
  console.log("Query Service Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === EventType.PostCreated) {
    const { id, title } = data;
    posts.push({ id, title, comments: [] });
  }

  if (type === EventType.CommentCreated) {
    const { id, content, postId } = data;

    comments.push({ id, content, postId });
    console.log({ comments });
  }

  res.send({ msg: "OK" });
});

app.listen(PORT, () => console.log(`Query service listening on port ${PORT}`));
