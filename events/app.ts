import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = 4005;

const app = express();

app.use(cors())
app.use(express.json());



app.post('/events', async (req, res) => {
  const event = JSON.stringify(req.body);

  console.log('Received event:', event)

  try {
    // posts
    fetch('http://localhost:4000/events', {
      method: 'POST',
      body: event,
    })
    // comments
    fetch('http://localhost:4001/events', {
      method: 'POST',
      body: event,
    })

    res.status(200).send({ status: 'OK' })
  } catch (error) {
    console.log(error)
    
  }
})

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))