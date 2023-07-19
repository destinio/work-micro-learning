import express from 'express';
import crypto from 'crypto';
import cors from 'cors';

const PORT = 4001;

const app = express();
app.use(cors())

const commentsByPostId = {}

app.use(express.json());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
  const commentId = crypto.randomUUID();

  const {content} = req.body

  const comments = commentsByPostId[req.params.id] || []

  comments.push({id: commentId, content})

  commentsByPostId[req.params.id] = comments

  res.status(201).send(comments)
})

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))