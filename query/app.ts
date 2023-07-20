import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const PORT = 4002

let posts: any = []
let comments: any = []

enum EventType {
  PostCreated = "PostCreated",
  CommentCreated = "CommentCreated",
  CommentModerated = "CommentModerated",
  CommentUpdated = "CommentUpdated",
}

const app = express()

app.use(cors())
app.use(express.json())

// posts
app.get("/posts", (req, res) => {
  const postsForResponse = posts.map((post: any) => {
    return {
      ...post,
      comments: comments.filter((comment: any) => comment.postId === post.id),
    }
  })

  res.send(postsForResponse)
})
app.get("/posts/:id", (req, res) => {
  const post = posts.map((post: any) => {
    return {
      ...post,
      comments: comments.filter((comment: any) => comment.postId === post.id),
    }
  })

  res.send(post)
})

// comments
app.get("/comments", (req, res) => {
  res.send(comments)
})

app.get("/comments/:id", (req, res) => {
  const commet = comments.find((comment: any) => comment.id === req.params.id)
  if (!commet) {
    return res.status(404).send({ msg: "Comment not found" })
  }
  res.send(commet)
})

app.put("/comments/:id", (req, res) => {
  const comment = comments.find((comment: any) => comment.id === req.params.id)
  if (!comment) {
    return res.status(404).send({ msg: "Comment not found" })
  }

  console.log("REQ BODY", req.body)

  res.send(comment)
})

// events from event bus
app.post("/events", async (req, res) => {
  console.log("Query Service Received Event", req.body.type)

  const { type, data } = req.body

  if (type === EventType.PostCreated) {
    const { id, title } = data
    posts.push({ id, title, comments: [] })
  }

  if (type === EventType.CommentCreated) {
    const { id, content, postId, status } = data

    comments.push({ id, content, postId, status })

    await fetch("http://localhost:4005/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: EventType.CommentModerated,
        data: {
          id,
          content,
          postId,
          status,
        },
      }),
    })
  }

  if (type === EventType.CommentUpdated) {
    const { id, status } = data

    const comment = comments.find((comment: any) => comment.id === id)
    if (!comment) {
      return res.status(404).send({ msg: "Comment not found" })
    }

    comment.status = status

    comments = comments.map((comment: any) => {
      if (comment.id === id) {
        return { ...comment, status }
      }
      return comment
    })
  }

  res.send({ msg: "OK" })
})

app.listen(PORT, () => console.log(`Query service listening on port ${PORT}`))
