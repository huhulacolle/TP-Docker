import express from 'express'
import authRouter from './router/auth.js'
import messageRouter from './router/message.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import morgan from 'morgan';
import logger from './configuration/logger.js'

const app = express()
const port = 3000

mongoose.connect("mongodb://mongo:27017/tpdocker")
  .then(() => {
  console.log('Connecté à MongoDB');
  })
  .catch((error) => {
  console.error(error);
  }) 

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream: logger.stream }));

app.use("/api/auth/", authRouter);
app.use("/api/message/", messageRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`app listening on port ${port}`)
})