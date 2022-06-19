import express from 'express'
import fetch from "node-fetch"
import fs from 'fs/promises'
import bodyParser from 'body-parser'
import 'dotenv/config'
const app = express()
const port = 3000
app.use(bodyParser.json({ type: 'application/*+json' }))
var jsonParser = bodyParser.json()

async function getAuth() {
  const api_fetch = await fetch(`${process.env.API}/me`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
  const response = await api_fetch.json();

  return response.data
}

async function openFile(name) {
  try {
    const data = await fs.readFile(`${process.env.OBSIDIAN_FOLDER}/${name}`, { encoding: 'utf8' })
    return data
  } catch (err) {
    throw err
  }
}

async function bodyParserContent(fileName) {
  let file = await openFile(fileName)
  var myRegex = new RegExp("^#[\\w' '.]*", "g")
  const title = file.match(myRegex).toString().replace("# ", "")
  file = file.replace("[[", "").replace("]]", "")
  const body = {
    "title": title,
    "contentFormat": "markdown",
    "content": file,
    "publishStatus": "draft"
  }
  console.log(body)

  return JSON.stringify(body)
}

app.get('/', async (_, res) => {
  const app = await getAuth()
  res.status(200).json({ data: app })
})

app.post('/post', jsonParser, async (req, res) => {
  const app = await getAuth()
  console.log(req.body)
  const body = await bodyParserContent(req.body.fileName)
  const api_fetch = await fetch(`${process.env.API}/users/${app.id}/posts`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN}`,
      'Accept-Charset': 'utf-8'
    },
    body: body
  })
  const data = await api_fetch.json()
  res.status(200).json({ api: data })
})

app.listen(port, () => {
  console.log(`[***] servidor rodando em ${port}`)
})
