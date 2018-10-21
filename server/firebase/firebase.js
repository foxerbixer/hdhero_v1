import admin from 'firebase-admin'
import serviceAccount from './hdherokima-firebase-adminsdk-hv33c-76842102ed.json'
import _ from 'lodash'


export default async (ctx) => {
  // try {


  //   // const prodRepeat = 1000 * 3600 * 12

  //   // const timerId = setInterval(() => {
  //   //    saveToFB()
  //   // }, 30000)

    // await getMoviesAndSaveToFB(ctx)

  // await deleteAllMovies()


  // } catch(error) {
  //   console.log(error)
  // }
} 

async function getMoviesAndSaveToFB(ctx) {
  try {
    const { Movie } = ctx.models

    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://hdherokima.firebaseio.com"
    })
    
    const db = await admin.database()
    const ref = await db.ref('/movies')
    const moviesRef = ref.child("all-movies")
    const movies_raw = await Movie.find()
  

    const movies = await Promise.all(movies_raw.slice(9, 1000).map(async(item) => {
      const genres = await getKeysForGenres(item.genre)  
      const entity = {...item._doc } 
      const newItem = _.omit(entity, ['createdAt', 'updatedAt', '__v', '_id'])
      const movieItem = {...newItem, ...genres }
      return movieItem
    }))

    await movies.map(movie => {
      moviesRef.orderByChild("kp_id").equalTo(+movie.kp_id).once('value', snapshot => {
        if (!snapshot.exists()) {
          moviesRef.push(movie)        
        } 
      })
    })

  } catch(error) {
    console.log(error)
  }
}

async function getKeysForGenres(genre) {
  try {
    const genres = {}
    const reg_western = /Вестерны/
    const reg_art = /Арт-хаус/
    const reg_crime = /Криминал/
    const reg_fantastic = /Фантастика/
    const reg_horror = /Ужасы/
    const reg_ero = /Эротика/
    const reg_shorts = /Короткометражные/
    const reg_family = /Семейные/
    const reg_action = /Боевики/
    const reg_adventure = /Приключения/
    const reg_comedy = /Комедии/
    const reg_musical = /Мьюзиклы/
    const reg_childish = /Детские/
    const reg_ours = /Наши/
    const reg_fantasy = /Фэнтези/
    const reg_military = /Военные/
    const reg_drama = /Драмы/
    const reg_melodrama = /Мелодрамы/
    const reg_history = /Исторические/
    const reg_travels = /Путешествия/
    const reg_ukr = /Украинские/
    const reg_biographical = /Биографические/
    const reg_detective = /Детективы/
    const reg_sport = /Спортивные/
    const reg_triller = /Триллеры/
    const reg_documentary = /Документальные/
    const reg_informative = /Познавательные/
    const reg_foreign = /Зарубежные/
  
    if (reg_western.test(genre)) {
      genres.key_western = 'Вестерны'
    }
    if (reg_art.test(genre)) {
      genres.key_art = 'Арт-хаус'
    }
    if (reg_crime.test(genre)) {
      genres.key_crime = 'Криминал'
    }
    if (reg_fantastic.test(genre)) {
      genres.key_fantastic = 'Фантастика'
    }
    if (reg_horror.test(genre)) {
      genres.key_horror = 'Ужасы'
    }
    if (reg_ero.test(genre)) {
      genres.key_ero = 'Эротика'
    }
    if (reg_shorts.test(genre)) {
      genres.key_shorts = 'Короткометражные'
    }
    if (reg_family.test(genre)) {
      genres.key_family = 'Семейные'
    }
    if (reg_action.test(genre)) {
      genres.key_action = 'Боевики'
    }
    if (reg_adventure.test(genre)) {
      genres.key_adventure = 'Приключения'
    }
    if (reg_comedy.test(genre)) {
      genres.key_comedy = 'Комедии'
    }
    if (reg_musical.test(genre)) {
      genres.key_musical = 'Мьюзиклы'
    }
    if (reg_childish.test(genre)) {
      genres.key_childish = 'Детские'
    }
    if (reg_ours.test(genre)) {
      genres.key_ours = 'Наши'
    }
    if (reg_fantasy.test(genre)) {
      genres.key_fantasy = 'Фэнтези'
    }
    if (reg_military.test(genre)) {
      genres.key_military = 'Военные'
    }
    if (reg_drama.test(genre)) {
      genres.key_drama = 'Драмы'
    }
    if (reg_melodrama.test(genre)) {
      genres.key_melodrama = 'Мелодрамы'
    }
    if (reg_history.test(genre)) {
      genres.key_history = 'Исторические'
    }
    if (reg_travels.test(genre)) {
      genres.key_travels = 'Путешествия'
    }
    if (reg_ukr.test(genre)) {
      genres.key_ukr = 'Украинские'
    }
    if (reg_biographical.test(genre)) {
      genres.key_biographical = 'Биографические'
    }
    if (reg_detective.test(genre)) {
      genres.key_detective = 'Детективы'
    }
    if (reg_sport.test(genre)) {
      genres.key_sport = 'Спортивные'
    }
    if (reg_triller.test(genre)) {
      genres.key_triller = 'Триллеры'
    }
    if (reg_documentary.test(genre)) {
      genres.key_documentary = 'Документальные'
    }
    if (reg_informative.test(genre)) {
      genres.key_informative = 'Познавательные'
    }
    if (reg_foreign.test(genre)) {
      genres.key_foreign = 'Зарубежные'
    }
  
    return genres
  } catch(error) {
    console.log(error)
  }
}

async function deleteAllMovies () {
  const db = await admin.database()
  const ref = await db.ref('/movies')
  await ref.child("all-movies").remove()
}
