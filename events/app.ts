import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const PORT = 4005

const app = express()

app.use(cors())
app.use(express.json())

const events: any[] = []

app.get("/events", (req, res) => {
  res.send(events)
})

app.post("/events", async (req, res) => {
  const event: any = req.body.type

  console.log("Event Bus Received event:", event)

  events.push(req.body)

  // posts service
  fetch("http://localhost:4000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
  // comments service
  fetch("http://localhost:4001/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
  // query service
  fetch("http://localhost:4002/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  }).catch((error) => console.log("ERROR", error))
  // moderation service
  fetch("http://localhost:4003/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })

  return res.status(200).send({ status: "OK" })
})

app.listen(PORT, () => console.log(`Event bus listening on port ${PORT}`))
