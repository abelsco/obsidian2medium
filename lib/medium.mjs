import fetch from "node-fetch"
import fs from 'fs/promises'
import 'dotenv/config'


const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.TOKEN}`,
  'Accept-Charset': 'utf-8'
}

export async function getAuth() {
  const api_fetch = await fetch(`${process.env.API}/me`, {
    method: 'get',
    headers: headers
  })
  const response = await api_fetch.json();

  return response
}

export async function draftPost(file) {
  const app = await getAuth()
  console.log(file)
  const body = await bodyParserContent(file.fileName)
  const api_fetch = await fetch(`${process.env.API}/users/${app.data.id}/posts`, {
    method: 'post',
    headers: headers,
    body: body
  })
  const response = await api_fetch.json()

  return response

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
