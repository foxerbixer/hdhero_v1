import { AsyncRouter } from 'express-async-router'
import Movie from '../models/Movie'

export default function (ctx) {
  const api = AsyncRouter()
 

  // ROUTE /api/movies/all-movies
  // DESC return array of movies
  // ACCESS Public
  api.get('/', async (req, res) => {
    try {

     const movies = await Movie.find().then(result => result.slice(0, 10))

     await res.json(movies)

    } catch(error) {
      console.log(error)
    }
  })

  return api
}

