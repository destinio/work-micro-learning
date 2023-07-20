import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = 4005;

const app = express();

app.use(cors())
app.use(express.json());

app.post('/events', async (req, res) => {

  console.log(req.body.type)

  try {
    // posts
    fetch('http://localhost:4000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    })
    // comments
    fetch('http://localhost:4001/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    })
    // fetch('http://localhost:4002/events', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(req.body),
    // })

    res.status(200).send({ status: 'OK' })
  } catch (error) {
    console.log(error)
    
  }
})

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))