import express from 'express'
import router from './router/auth.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express()
const port = 3000

mongoose.connect("mongodb://mongo-dev:27017/tpdocker")

app.use(bodyParser.json());

app.use(`/api/`, router)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})