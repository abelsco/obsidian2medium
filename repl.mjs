#!/usr/bin/env node
import { MediumAPI } from './lib/medium.mjs'
import promptSync from 'prompt-sync'

const medium = new MediumAPI()
const prompt = promptSync({ eot: true })
const message = 'Insert a fileName => '
const help = 'Enter a fileName.md from your $OBSIDIAN_FOLDER exemples: Subfolder/Many/file.md or file.md\nCtrl+D for Exit'

async function parseCommand(params) {
  if (params === '-h') {
    console.log(help)
  } else {
    const response = await medium.draftPost({ fileName: params })
    console.log(response)
  }
  const query = prompt(message)
  parseCommand(query)
}

const response = await medium.getAuth()
medium.checkStatus(response.status)
console.log(`Welcome ${response.api.data.name}\n-h for help`)
console.info(help)

const query = prompt(message)
parseCommand(query)

