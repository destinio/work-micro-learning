import express from 'express';
import crypto from 'crypto';

const PORT = 4000;

const app = express();

app.use(express.json());

const post = [
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
  res.json(post);
})

app.post('/posts', (req, res) => {
  const id = crypto.randomUUID();
  res.json({ id, title: req.body.title, content: req.body.content });
})

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))