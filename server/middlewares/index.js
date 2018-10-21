export default () => ({

  reqParser: require('./reqParser').default(...arguments),
  compress: require('./compress').default(...arguments)
  
})
