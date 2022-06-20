// @ts-check

import { MediumAPI } from '../lib/medium.mjs'
import 'dotenv/config'

describe('getAuth()', () => {
  test('is alive', async () => {
    const medium = new MediumAPI()
    const actual = await medium.getAuth()
    const expected = 200

    expect(actual.status).toBe(expected)
  })

  test('get your username', async () => {
    const medium = new MediumAPI()
    const actual = await medium.getAuth()

    expect(actual.api.data.username).toBe(process.env.USERNAME)
  })

})

describe('draftPost()', () => {
  test('upload a invalid name', async () => {
    const medium = new MediumAPI()
    const actual = await medium.draftPost('invalid')
    const expected = -2

    expect(actual.api.code).toBe(expected)
  })

  test('try invalid input .', async () => {
    const medium = new MediumAPI()
    const actual = await medium.draftPost({ fileName: '.' })
    const expected = -21

    expect(actual.api.code).toBe(expected)
  })

  test('try invalid input *.md', async () => {
    const medium = new MediumAPI()
    const actual = await medium.draftPost({ fileName: '*.md' })
    const expected = -2

    expect(actual.api.code).toBe(expected)
  })

  test('try invalid input ../.', async () => {
    const medium = new MediumAPI()
    const actual = await medium.draftPost({ fileName: '../.' })
    const expected = -21

    expect(actual.api.code).toBe(expected)
  })

  test('try invalid input *.*', async () => {
    const medium = new MediumAPI()
    const actual = await medium.draftPost({ fileName: '*.*' })
    const expected = -2

    expect(actual.api.code).toBe(expected)
  })

  test('try invalid input ../*.md', async () => {
    const medium = new MediumAPI()
    const actual = await medium.draftPost({ fileName: '../*.md' })
    const expected = -2

    expect(actual.api.code).toBe(expected)
  })

  test('try invalid key input', async () => {
    const medium = new MediumAPI()
    const actual = await medium.draftPost({ fileNames: 'Modelo.md' })
    const expected = -2

    expect(actual.api.code).toBe(expected)
  })
})
