import express from 'express';
import cors from 'cors';

const PORT = 4002;

const posts: any = {}

enum EventType {
  PostCreated = 'PostCreated',
  CommentCreated = 'CommentCreated',
}

const app = express();
app.use(cors())

app.use(express.json());


app.get('/posts', (req, res) => {
  res.send(posts)
})

// events from event bus
app.post('/events', (req, res) => {
  console.log('Query Service Received Event', req.body.type)

  const {type, data} = req.body

  if (type === EventType.PostCreated) {
    const {id, title} = data
    posts[id] = { id, title, comments: [] }
  }

  if (type === EventType.CommentCreated) {
    const {id , content, postId} = data

    const post = posts[postId]

    if (!post) {
      console.log('Post not found')
      return res.status(404).send({ error: 'Post not found. No comment added' })
    }

    post.comments.push({id, content})
  }

  res.send({})
})

app.listen(PORT, () => console.log(`Query service listening on port ${PORT}`))