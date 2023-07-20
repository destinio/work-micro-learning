import express from "express"
import crypto from "crypto"
import cors from "cors"
import fetch from "node-fetch"

const PORT = 4000

const app = express()

app.use(cors())
app.use(express.json())

const posts = []

app.post("/posts", async (req, res) => {
  const id = crypto.randomUUID()
  const { title, content } = req.body

  posts.push({ id, title, content })
  // emit event to event bus /events
  try {
    await fetch("http://localhost:4005/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "PostCreated",
        data: {
          id,
          title,
          content,
        },
      }),
    })

    res.send({ id, title, content })
  } catch (error) {
    console.log(error)
    res.status(201).send({ id, title, content })
  }
})

// events from event bus
app.post("/events", (req, res) => {
  console.log("Post Service Received Event", req.body.type)

  res.send({})
})

app.listen(PORT, () => console.log(`Posts service listening on port ${PORT}!`))
