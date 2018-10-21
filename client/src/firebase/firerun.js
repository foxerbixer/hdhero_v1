// import firebase from 'firebase'
// import axios from 'axios'

// export async function getAllMovies() {
//   try {
//     const allMovies = await axios.get('/api/movies/all-movies')
//     return allMovies.data 
//   } catch(error) { console.log(error) }
// }

// window.saveToFB = async function() {
//   try {
//     const allMoviesRef = await firebase.database().ref('/all-movies')
//     const allMovies = await getAllMovies()

//     // await firebase.database().ref('/all-movieis').once('value', data => {
//     //   if (!data.val()) {
//     //    allMovies.map(item => allMoviesRef.push(item))
//     //   }
//     // })
//     allMovies.slice(0, 12).map(movie => {
//       allMoviesRef.orderByChild("kp_id").equalTo(movie.kp_id).once('value', data => {
//         if(!data.exists()) {
//           allMoviesRef.push(movie)
//         }
//       })
//     })
//   } catch(error) {
//     console.log(error)
//   }
// }

    