import axios from 'axios'
import cheerio from 'cheerio'
import getConfig from './confing'
import Movie  from '../models/Movie'
import cloudinary from 'cloudinary'


export default async () => {

//   const conf = getConfig()
//   const movies = getMoviesFromApi(conf.moviesAPI.url)
//   const mainURL = conf.gidonline.url
//   const prodRepeat = 1000 * 3600 * 12
//   const devRepeat = 15000

//   let counter = 1
  
//   const timerId = setInterval(() => {
 
//     parseGidonline(`${mainURL}/page/${counter}`, movies)
//     console.log(`${mainURL}/page/${counter}`)
//     counter++

//     if (counter === 12) {
//       clearInterval(timerId)
//       console.log(`DONE ${counter} times`)
//    }
//   }, devRepeat)
// }

// // get movies from api
// function getMoviesFromApi(url) {
//   const movies = []
//   axios.get(url)
//     .then(res => {
//       const dataFromRes = res.data
//       dataFromRes.map(item => {
//         movies.push(item)
//       })
//     })
//     .catch(err => console.log(err))
//   return movies
// }

//  //post&getcloudinary link for picture
// function fetchPictureToCloudinary(picture) {
//   const cnf = getConfig()

//   cloudinary.config({
//     cloud_name: cnf.cloudinary.name,
//     api_key: cnf.cloudinary.key,
//     api_secret: cnf.cloudinary.secret
//   })

//   const result = cloudinary.image(picture, {type: 'fetch'})
//   const $ = cheerio.load(result)
//   const cloud_link = $(result).attr().src
//   return cloud_link
// }


// // parse gidonline
// function parseGidonline(url, movies) {
//   const conf = getConfig()
//   const setOfFilms = new Set()
//   const kpURL = conf.kinopoisk.url
//   const mainURL = conf.gidonline.url

//   axios.get(url)
//     .then(res => {

//       const body = res.data
//       const $ = cheerio.load(body)
      
    
//       $('.mainlink > img ').toArray().map(item => {
        
//         if (item.name === 'img') {
//           const getElWIthYear = $(item).nextAll()[2]
//           const published = $(getElWIthYear).text()
//           const hr = $(item).parent().attr()
//           const mainLinkToFilm = hr.href
      
//           movies.map(el => {
//             if ((el.name === item.attribs.alt) && (el.year === published)) {

//               const newPost = {
//                 picture: `${mainURL}${item.attribs.src}`,
//                 movie: el.url,
//                 kp_id: el.kinopoisk_id,
//                 kp_url: `${kpURL}/${el.kinopoisk_id}`,
//                 gid_href: mainLinkToFilm
//               }
        
//                 setOfFilms.add(newPost)
//             }
//           })
//         }
//       })
//     })
//     .then(() => {
//       setOfFilms.forEach(film => {

//         axios.get(film.gid_href).then(res => {
//           const newBody = res.data
//           const $$ = cheerio.load(newBody)
//           const firstTarget = $$('.t-row').children()
//           const name = $$(firstTarget[0]).text().replace('название', '')
//           const year = $$(firstTarget[1]).text().replace('год', '')
//           const country = $$(firstTarget[2]).text().replace('страна', '')
//           const genre = $$(firstTarget[3]).text().replace('жанр', '')
//           const duration = $$(firstTarget[4]).text().replace('время', '')
//           const actors = $$(firstTarget[6]).text().replace('в главных ролях', '')

//           // const desc = $$('.infotext ').text().replace('© ГидОнлайн', '')
        
//           Movie.findOne({ name, kp_id: film.kp_id })
//             .then(movie => {

//             if (!movie) {

//               const cloud_link = fetchPictureToCloudinary(film.picture)
//               const newMovie = new Movie({
//                 name, 
//                 movie: film.movie,
//                 kp_id: film.kp_id,
//                 kp_url: film.kp_url,
//                 picture: cloud_link,
//                 year,
//                 country,
//                 genre,
//                 duration,
//                 actors,
//                 gid_url: film.gid_href
//                 // desc
//               })

//               newMovie.save().then(() => console.log('success'))
//             } else console.log('already exists')
//           })
//             .catch(err => console.log(err))
//         })
//       })
//       setOfFilms.clear()
//     })
//     .catch(err => console.log(err))
}









