import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = 4002;

const app = express();
app.use(cors())

app.use(express.json());

// events from event bus
app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type)
  
  res.send({})
})

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))