export default function(ctx) {
  return {
    Movie: require('./Movie').default(...arguments)
  }
}