import { OrderedMap, Record } from 'immutable'
import _ from 'lodash'

export const generateId = () => Date.now()

export const tranformFbData = (data, MovieState = Record) => {
  return (new OrderedMap(data)).entrySeq().map( ([key, value]) => [{'uid': key},(new MovieState(value))])
}

export const tranformComments = (data, CommentState = Record) => {
  return (new OrderedMap(data)).mapEntries(([uid, value]) => (
    [uid, (new CommentState(value)).set('uid', uid)]
))
}

export const transformFbPeople = (data, Person = Record) => {
  return (new OrderedMap(data)).mapEntries(([uid, value]) => (
      [uid, (new Person(value)).set('uid', uid)]
  ))
}

export const findMovieThatClientMeans = async (movies, name) =>{
  try {
    const moviesArr = _.toArray(movies)
    const reg = new RegExp(`${name}`, 'gi')
    const result = {} 

    _.find(moviesArr, (item)  => {
      if (
        reg.test(item.name) ||
        reg.test(item.origname) ||
        reg.test(item.year) ||
        reg.test(item.genre) ||
        reg.test(item.director)) {
        result[item.name] = item
      }
    })
    

    return result


    
  } catch(error) {}
}



