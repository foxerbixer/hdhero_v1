import axios from 'axios'
import cheerio from 'cheerio'
import getConfig from './confing'
import cloudinary from 'cloudinary'
import _ from 'lodash'

export default async (ctx) => {
  try {
    // const cfg = getConfig()
    // const prodRepeat = 1000 * 3600 * 12
    // const devRepeat = 15000
    // const movies = await getMoviesFromApi(cfg.moviesAPI.url)

    // let counter = 1
  
    // const timerId = await setInterval(async() => {
    //   console.log(`${cfg.hdrezka.url}/page/${counter}`)
    //   const result = await parseHdrezka(movies, `${cfg.hdrezka.url}/page/${counter}`)
    //   await saveArrOfMoviesToDB(result, ctx)
    //   // counter++

    //   // if (counter === 20) {
    //   //   clearInterval(timerId)
    //   //   console.log(`DONE ${counter} times`)
    //   // }

    // }, prodRepeat)

  } catch(error) {
    console.log(error)
  }
}

// save movies to db
async function saveArrOfMoviesToDB(arr, ctx) {
  const { Movie } = ctx.models
  
  await Promise.all(arr.map(async(item) => {
    const movie = await Movie.findOne({ kp_id: item.kp_id })
    if (!movie) {
      
     const newMovie = new Movie({
       name: item.name,
       origname: item.origname,
       director: item.director,
       year: item.year,
       release_date: item.release_date,
       country: item.country,
       genre: item.genre,
       slogan: item.slogan,
       time: item.time,
       kp_id: item.kp_id,
       raiting_imdb: item.raiting_imdb,
       raiting_kp: item.raiting_kp,
       age: item.age,
       kp_url: item.kp_url,
       imdb_href: item.imdb_href,
       hdrezka_url: item.hdrezka_url,
       movie_url: item.movie_url,
       mini_picture: item.mini_picture,
       max_picture: item.max_picture,
       actors: item.actors,
       desc: item.desc
     })
      await newMovie.save()
      console.log('success')
    } else {
      console.log('already exists')
    }
  }))
}

// get movies from api
async function getMoviesFromApi(url) {
  try {
    const movies = []
    const response = await axios.get(url)
    const dataFromRes = response.data
    await dataFromRes.map(item => {
      movies.push(item)
    })
    const sortedMoviesStep1 =  _.uniqBy(movies, "kinopoisk_id")
    const sortedMoviesStep2 =  _.uniqBy(sortedMoviesStep1, "url")
    const sortedMoviesStep3 =  _.uniqBy(sortedMoviesStep2, "name")
    return sortedMoviesStep3
  } catch(error) {
    console.log(error)
  }
}

//post&getcloudinary link for picture
async function fetchPictureToCloudinary(picture) {
  const cnf = getConfig()
  cloudinary.config({
    cloud_name: cnf.cloudinary.name,
    api_key: cnf.cloudinary.key,
    api_secret: cnf.cloudinary.secret
  })

  const result = cloudinary.image(picture, {type: 'fetch'})
  const $ = cheerio.load(result)
  const cloud_link = $(result).attr().src
  return cloud_link
}


// parse imdb search page
async function parseIMDBSearchPage(name) {
  try {
    const requestUrl = `http://www.imdb.com/find?q=${name}&s=tt&ttype=ft&ref_=fn_ft`
    const imdb_main_href = 'https://www.imdb.com'
    const body = await axios.get(requestUrl).then(res => res.data)
    const $ = cheerio.load(body)
    const target = await $('.findSection > .findList > tbody > tr > td').children()
    const imdb_href = imdb_main_href + target[0].attribs.href
    return imdb_href
  } catch(error) {
    return 'nopage'
  }
}

// parse page with movie
async function parsePage(url) {
  const movie_info = {}
  const resp = await axios.get(url)
  const body = resp.data
  const $ = cheerio.load(body)
  const infoBlock = $('.b-post__infotable_right > div > table > tbody').children().toArray()

  const actors = $('.b-post__info > tbody > tr').children().last().text().replace('В ролях актеры:', ' ').trim()

  await infoBlock.map(item => {
    const itemChildren = $(item).children().toArray()
    const firstItem = $(itemChildren[0]).text().trim()

    if (firstItem === 'Рейтинги:') {
      const raiting = $(itemChildren[1]).children().toArray()
      raiting.map(rateItem => {
        if (rateItem.attribs.class == 'b-post__info_rates imdb') {
          const raiting_imdb = $(rateItem).find('span').text().trim()
          movie_info.raiting_imdb = raiting_imdb
        }
        if (rateItem.attribs.class == 'b-post__info_rates kp') {
          const raiting_kp = $(rateItem).find('span').text().trim()
          movie_info.raiting_kp = raiting_kp
        }
      }) 
    }
   
    if (firstItem === 'Слоган:') {
      const slogan = $(itemChildren[1]).text().trim()
      movie_info.slogan = slogan
    }

    if (firstItem === 'Дата выхода:') {
      const release_date = $(itemChildren[1]).text().trim()
      movie_info.release_date = release_date
    }

    if (firstItem === 'Страна:') {
      const country = $(itemChildren[1]).text().trim()
      movie_info.country = country
    }

    if (firstItem === 'Режиссер:') {
      const director = $(itemChildren[1]).text().trim()
      movie_info.director = director
    }

    if (firstItem === 'Жанр:') {
      const genre = $(itemChildren[1]).text().trim()
      movie_info.genre = genre
    }

    if (firstItem === 'Возраст:') {
      const age = $(itemChildren[1]).text().trim()
      movie_info.age = age
    }

    if (firstItem === 'Время:') {
      const time = $(itemChildren[1]).text().trim()
      movie_info.time = time
    }
  })

  const name = $('.b-content__main > .b-post__title > h1').text().trim()
  const origname = $('.b-content__main > .b-post__origtitle ').text().trim()
  const max_picture = $('.b-post__infotable_left > div > div > a').attr().href
  const mini_picture = $('.b-post__infotable_left > div > div > a > img').attr().src
  const desc = $('.b-content__main > .b-post__description > .b-post__description_text').text().trim()
  const imdb_href = await parseIMDBSearchPage(origname)

  movie_info.imdb_href = imdb_href
  movie_info.name = name
  movie_info.origname = origname
  movie_info.max_picture = max_picture
  movie_info.mini_picture = mini_picture
  movie_info.hdrezka_url = url
  movie_info.actors = actors
  movie_info.desc = desc

  return movie_info
}

// parse hdrezka
async function parseHdrezka(movies, url) {
  try {
    const conf = getConfig()
    const arrOfHrefs = []
    const resp = await axios.get(url)
    const body = resp.data
    const $ = await cheerio.load(body)
    const target = $('.b-content__inline_items').children()
    const targetToArr = target.toArray()

    await targetToArr.map(item => {
      if (item.attribs.class === 'b-content__inline_item'){
        const itemBody = cheerio.load(item)
        const item_url = itemBody('.b-content__inline_item-cover > a').attr().href
        arrOfHrefs.push(item_url)
      }
    })
  

   const results = await Promise.all(arrOfHrefs.map(async(item) => {
     return parsePage(item)
    }))

   const arrWithMovies = [] 

    await Promise.all(results.map(async(item1) => {
      await Promise.all(movies.map(async(item2) => {
        if (item1.name == item2.name) {
          const kp_url = `${conf.kinopoisk.url}/${item2.kinopoisk_id}`
          const movieEl = await {...item1, year: item2.year, kp_id: item2.kinopoisk_id, movie_url: item2.url, kp_url }
          await arrWithMovies.push(movieEl)
        }
      }))
    }))

    const updatedArrWithMovies = []

    await Promise.all(arrWithMovies.map(async(item) => {
      const mini_picture = await fetchPictureToCloudinary(item.mini_picture)
      const max_picture = await fetchPictureToCloudinary(item.max_picture)
      const newItem = {...item, mini_picture, max_picture}
      updatedArrWithMovies.push(newItem)
    }))
    
    return updatedArrWithMovies
    
  } catch(error) {
    console.log(error)
  }
}