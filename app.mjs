import express from 'express'
import { MediumAPI } from './lib/medium.mjs'
const app = express()
const port = 3000
app.use(express.json())
const medium = new MediumAPI()

app.get('/', async (_, res) => {
  const response = await medium.getAuth()
  res.status(response.status).json(response.api)
})

app.post('/post', async (req, res) => {
  const response = await medium.draftPost(req.body)
  res.status(response.status).json(response.api)
})

app.listen(port, () => {
  console.log(`[***] servidor rodando em ${port}`)
})
