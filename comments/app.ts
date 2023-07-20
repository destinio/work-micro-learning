import express from "express"
import crypto from "crypto"
import cors from "cors"
import fetch from "node-fetch"

const PORT = 4001

enum EventTypes {
  CommentCreated = "CommentCreated",
  CommentModerated = "CommentModerated",
  CommentUpdated = "CommentUpdated",
}

const app = express()
app.use(cors())

app.use(express.json())

app.post("/posts/:id", async (req, res) => {
  const commentId = crypto.randomUUID()

  const { content } = req.body

  try {
    await fetch("http://localhost:4005/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: EventTypes.CommentCreated,
        data: {
          id: commentId,
          content,
          status: "pending",
          postId: req.params.id,
        },
      }),
    })
  } catch (error) {
    console.log("ERRRRRROR", error)
    throw error
  }

  res
    .status(201)
    .send({ id: commentId, status: "pending", content, postId: req.params.id })
})

// events from event bus
app.post("/events", (req, res) => {
  console.log("Comments Service Received Event", req.body.type)

  res.send({})
})

app.listen(PORT, () =>
  console.log(`Comments service listening on port ${PORT}`)
)
