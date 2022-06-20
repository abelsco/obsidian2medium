import fetch from 'node-fetch'
import fs from 'fs/promises'
import 'dotenv/config'

/**
* Class with the logical implementation for the Medium API 
*
*/
export class MediumAPI {
  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN}`,
      'Accept-Charset': 'utf-8'
    }
  }
  /**
  * Get your Authorization from the API of medium
  *
  * @returns {object} JSON response from the API
  */
  async getAuth() {
    const api_fetch = await fetch(`${process.env.API}/me`, {
      method: 'get',
      headers: this.headers
    })
    const response = await api_fetch.json();

    return response
  }

  /**
  * Create a post in draft mode on the user authenticated
  *
  * @param {object} path JSON with fileName atribute where your obsidian file.md is defined
  * @returns {object} JSON response from the medium API
  */
  async draftPost(path) {
    const app = await this.getAuth()
    console.log(path)
    const body = await bodyParserContent(path.fileName)
    const api_fetch = await fetch(`${process.env.API}/users/${app.data.id}/posts`, {
      method: 'post',
      headers: this.headers,
      body: body
    })
    const response = await api_fetch.json()

    return response

  }
}

/**
* Non-blocking function for open a file
* 
* @param {string} name name or path/name for $OBSIDIAN_FOLDER/your/filename.md
* @returns {Promise<string>} string with content in utf-8 encoding
*/
async function openFile(name) {
  try {
    const data = await fs.readFile(`${process.env.OBSIDIAN_FOLDER}/${name}`, { encoding: 'utf8' })
    return data
  } catch (err) {
    throw err
  }
}

/**
* Scan the string from te file for the title and remove special characters
* 
* @param {string} file string with content from the file
* @returns {{file: string, title: string}} {file, title}
*/
function parseFile(file) {
  var myRegex = new RegExp("^#[\\w' '.]*", "g")
  const title = file.match(myRegex).toString().replace("# ", "")
  file = file.replace("[[", "").replace("]]", "")

  return { file: file, title: title }
}

/**
* Non-blocking function for parsing the body content for the Medium API
*
* @param {string} fileName name or path/name for $OBSIDIAN_FOLDER/your/filename.md
* @returns {Promise<string>} marshalling string representation for the body
*/
async function bodyParserContent(fileName) {
  const file = await openFile(fileName)
  const parse = parseFile(file)

  const body = {
    "title": parse.title,
    "contentFormat": "markdown",
    "content": parse.file,
    "publishStatus": "draft"
  }
  // console.log(body)

  return JSON.stringify(body)
}
