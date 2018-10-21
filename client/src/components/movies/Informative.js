import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { getInformative, showMoviePage } from '../../redux/ducks/movies'
import { moviesSelector, selectMovie } from '../../redux/ducks/movies'
import MovieItem from './MovieItem'
import Spinner from '../common/Spinner'
import Paginator from '../common/Pagination'


const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100
  },
  pagWrapper: {
    paddingTop: 50,
    paddingBottom: 50,
  }
})

class Informative extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageOfMovies: []
  }
}

  componentDidMount() {
    this.props.getInformative && this.props.getInformative()
  }


handleMovie = (uidKey, movie) => () => {

  selectMovie && selectMovie(uidKey, movie)
  localStorage.clear('movie')
  
  const movieFields = {
    name: movie.name,
    origname: movie.origname,
    director: movie.director,
    year: movie.year,
    release_date: movie.release_date,
    country: movie.country,
    genre: movie.genre,
    slogan: movie.slogan,
    time: movie.time,
    kp_id: movie.kp_id,
    raiting_imdb: movie.raiting_imdb,
    raiting_kp: movie.raiting_kp,
    age: movie.age,
    kp_url: movie.kp_url,
    imdb_href: movie.imdb_href,
    hdrezka_url: movie.hdrezka_url,
    movie_url: movie.movie_url,
    mini_picture: movie.mini_picture,
    max_picture: movie.max_picture,
    actors: movie.actors,
    desc: movie.desc

  }

  const movieStorage = JSON.stringify(movieFields)

  localStorage.setItem('movie', movieStorage)

  this.props.showMoviePage(this.props.history)
  
}

onChangePage = pageOfMovies => {
  this.setState({ pageOfMovies: pageOfMovies })
}

handleShowingMovie = () =>{
  this.props.showMoviePage(this.props.history)
  
}

  render() {
    const { classes, isLoading } = this.props
    const { pageOfMovies } = this.state

    let content

    isLoading 
      ? content = (
          <Grid container justify='center' alignItems="center" style={{height: 600}}>
            <Spinner/>
          </Grid>
        )
      : content = (
        <Grid item xs={12}>
          <Grid container justify="center" spacing={24}>
            {pageOfMovies.map(item => (
              <MovieItem key={item[0].uid} movieInfo={item[1]} uid={item[0].uid} handleMovie={this.handleMovie(item[0], item[1])} />
            ))}
          </Grid>
          <Grid container justify='center' className={classes.pagWrapper} >
           <Paginator items={this.props.movies} onChangePage={this.onChangePage}/>
          </Grid>
        </Grid>  
        )  
      
    return (
      <Grid container className={classes.root} spacing={16}>
        {content}
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  movies: moviesSelector(state),
  isLoading: state.movies.isLoading,
})

export default connect(mapStateToProps, { getInformative, selectMovie, showMoviePage })(withStyles(styles)(Informative))

