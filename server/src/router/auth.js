import express from 'express'

const router = express.Router();

router.get('/auth', async (req, res) => {
  res.send("salut");
})

export default router;