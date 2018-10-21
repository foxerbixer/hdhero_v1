export default function(ctx){
  return {
    firebaseAmin: require('./firebase').default(...arguments)
  }
}