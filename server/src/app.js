import express from 'express'
import authRouter from './router/auth.js'
import messageRouter from './router/message.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';

const app = express()
const port = 3000

mongoose.connect("mongodb://mongo-dev:27017/tpdocker")
  .then(() => {
  console.log('Connecté à MongoDB');
  })
  .catch((error) => {
  console.error(error);
  })

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/auth/", authRouter);
app.use("/api/message/", messageRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})