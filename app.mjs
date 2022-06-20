import express from 'express'
import { MediumAPI } from './lib/medium.mjs'
const app = express()
const port = 3000
app.use(express.json())
const medium = new MediumAPI()

app.get('/', async (_, res) => {
  const response = await medium.getAuth()
  res.status(200).json(response)
})

app.post('/post', async (req, res) => {
  const response = await medium.draftPost(req.body)
  res.status(200).json(response)
})

app.listen(port, () => {
  console.log(`[***] servidor rodando em ${port}`)
})
