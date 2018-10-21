export default function() {
  return {
    parseGidonline: require('./gidonline').default(...arguments),
    parseHdrezka: require('./hdrezka').default(...arguments)
  }
}