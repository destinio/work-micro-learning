import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const PORT = 4003

enum EventTypes {
  CommentCreated = "CommentCreated",
  CommentModerated = "CommentModerated",
  CommentUpdated = "CommentUpdated",
  PostCreated = "PostCreated",
}

const app = express()
app.use(cors())

app.use(express.json())

app.post("/events", async (req, res) => {
  const { type, data } = req.body

  console.log("Moderation Service Received Event:", type)

  if (type === EventTypes.CommentModerated) {
    const status = data.content.includes("fool") ? "rejected" : "approved"
    console.log(data, status)

    await fetch("http://localhost:4005/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: EventTypes.CommentUpdated,
        data: {
          ...data,
          status,
        },
      }),
    })
  }
})

app.listen(PORT, () =>
  console.log(`Comments service listening on port ${PORT}`)
)
