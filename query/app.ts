import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = 4002;

enum EventType {
  PostCreated = 'PostCreated',
  CommentCreated = 'CommentCreated',
}

const app = express();
app.use(cors())

app.use(express.json());

const posts: any = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

// events from event bus
app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type)

  const {type, data} = req.body

  if (type === EventType.PostCreated) {
    const {id, title} = data
    posts[id] = { id, title, comments: [] }
  }

  if (type === EventType.CommentCreated) {
    const {id , content, postId} = data

    const post = posts[postId]
    post.comments.push({id, content})
  }

  res.send({})
})

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))