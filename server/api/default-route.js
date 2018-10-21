import { AsyncRouter } from 'express-async-router'

export default function (ctx) {
  const api = AsyncRouter()

  // ROUTE /api/
  // desc return nothing
  // access Public

  api.get('/', async (req, res) => res.json('hello everyOne'))

  return api
}

