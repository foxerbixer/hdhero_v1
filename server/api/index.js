
export default () => ({
  defaultRoute: require('./default-route').default(...arguments),
  allMovies: require('./all-movies').default(...arguments)
})


