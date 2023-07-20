import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = 4001;

const app = express();
app.use(cors())

const commentsByPostId = {}

app.use(express.json());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = crypto.randomUUID();

  const {content} = req.body

  const comments = commentsByPostId[req.params.id] || []

  comments.push({id: commentId, content})

  commentsByPostId[req.params.id] = comments


  try {
    console.log("TRYING TO SEND EVENT")
    await fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'CommentCreated',
        data: {
          id: commentId,
          content,
          postId: req.params.id,
        }
      }),
    })
  } catch (error) {
    console.log("ERRRRRROR", error)
    throw error
  }

  res.status(201).send(comments)
})

// events from event bus
app.post('/events', (req, res) => {
  console.log('Comments Service Received Event', req.body.type)
  
  res.send({})
})

app.listen(PORT, () => console.log(`Comments service listening on port ${PORT}`))