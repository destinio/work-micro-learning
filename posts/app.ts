import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = 4000;

const app = express();

app.use(cors())
app.use(express.json());

const posts = [
  {
    id: 1,
    title: "Hello World",
    content: "This is my first post"
  },
  {
    id: 2,
    title: "Hello World 2",
    content: "This is my second post"
  },
]

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/posts', (req, res) => {
  res.json(posts);
})

app.post('/posts', (req, res) => {
  const id = crypto.randomUUID();
  const {title} = req.body;

  posts[id] = {
    id,
    title,
  }

  // emit event to event bus /events
  fetch('http://localhost:4005/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'PostCreated',
      data: {
        id,
        title: req.body.title,
      }
    }),
  })

  res.json({ id, title: req.body.title, content: req.body.content });
})

// events from event bus
app.post('/events', (req, res) => {
  console.log('Post Service Received Event', req.body.type)
  
  res.send({})
})

app.listen(PORT, () => console.log(`Posts service listening on port ${PORT}!`))