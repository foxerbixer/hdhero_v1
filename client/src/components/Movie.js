import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Iframe from 'react-iframe'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import classnames from 'classnames' 
import { connect } from 'react-redux'
import Spinner from './common/Spinner'
// import { getMovieDesc } from '../redux/ducks/movies'
import Button from '@material-ui/core/Button'
import ReactStars from 'react-stars'
import Fade from '@material-ui/core/Fade'
import Poster from './common/Poster'
import CommentList from './comments/CommentList'



const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 200,
    height: 300,
  },
  actions: {
    display: 'flex',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  desc: {
    marginBottom: 10
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'normal',
    paddingRight: 10,
  }
})

class Movie extends Component {
  constructor(){
    super()
    this.state = { 
      expanded: false,
      open: false 
    }
  }

  componentDidMount() {
    const movieStorage = localStorage.getItem('movie')
    const movie = JSON.parse(movieStorage)
    // this.props.getMovieDesc(movie.kp_id)
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open })
  } 

 render() {
  const { classes, isLoading } = this.props

  const movieStorage = localStorage.getItem('movie')
  const movie = JSON.parse(movieStorage)
  const tempImg = 'https://res.cloudinary.com/dfevin4e9/image/upload/v1537606310/1443080748.jpg'
  let content
    isLoading
      ? content = <Spinner />
      : content = (
      <Fade in={true}>
        <div style={{width: 620}}>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content} style={{paddingBottom: 0}}> 
                <Typography variant="headline">{movie.name}</Typography>
                <Typography variant="subheading" style={{marginBottom: 30}}>{movie.origname}</Typography>
                {
                  movie.slogan !== null
                    ? (
                      <Typography variant="subheading" style={{marginBottom: 30}}>
                        <span className={classes.title}>Слоган:</span>{movie.slogan}
                     </Typography>
                    )
                    : null
                }
                <Typography variant="subheading" color="textSecondary" className={classes.desc}>
                <span className={classes.title}>Дата выхода:</span> {movie.release_date}
                </Typography>
                <Typography variant="subheading" color="textSecondary" className={classes.desc}>
                <span className={classes.title}>Страна:</span> {movie.country}
                </Typography>
                <Typography variant="subheading" color="textSecondary" className={classes.desc}>
                 <span className={classes.title}>Режиссер:</span> {movie.director}
                </Typography>
                <Typography variant="subheading" color="textSecondary" className={classes.desc}>
                  <span className={classes.title}>Жанры</span> {movie.genre}
                </Typography>
                {
                  movie.age !== null
                    ? (
                        <Typography variant="subheading" color="textSecondary" className={classes.desc}>
                          <span className={classes.title}>Возраст:</span> {movie.age}
                        </Typography>
                      )
                    : null  
                }
                <Typography variant="subheading" color="textSecondary" className={classes.desc}>
                  <span className={classes.title}>Время:</span> {movie.time}
                </Typography>

              </CardContent>
            </div>
            <CardMedia style={{marginLeft: 'auto'}}
              onClick={this.handleToggle}
              className={classes.cover}
              image={movie.mini_picture}
        
              style={{cursor:'pointer'}}
            />
          </Card>
          <Card style={{paddingLeft: 27, paddingRight: 27, marginBottom: 50, paddingBottom: 27}}>
            <Typography variant="subheading" color="textSecondary" className={classes.desc}>
              {
                movie.actors
                  ? (<span><span className={classes.title}>Актеры:</span> {movie.actors}</span>) 
                  : null
              }
            </Typography>
            {
              movie.raiting_imdb !== null
                ? (
                  <div style={{display: 'flex'}}>
                    <Typography variant="subheading" color="secondary" className={classes.desc} style={{display: 'flex', marginBottom: 0, marginRight: 52, paddingTop: 10}}>
                      IMDB
                    </Typography>
                    <ReactStars
                      style={{display: 'flex'}}
                      count={10}
                      size={30}
                      value={+movie.raiting_imdb}
                      color2={'#ffd700'}
                      edit={false} 
                      />
                  </div>
                  )
                : null 
            }
                            {
              movie.raiting_kp !== null 
                ? (
                  <div style={{display: 'flex'}}>
                    <Typography variant="subheading" color="secondary" className={classes.desc} style={{display: 'flex', marginBottom: 0, marginRight: 20, paddingTop: 10}}>
                      kinopoisk
                    </Typography>
                    <ReactStars
                      style={{display: 'flex'}}
                      count={10}
                      size={30}
                      value={+movie.raiting_kp}
                      color2={'#ffd700'}
                      edit={false} 
                      />
                  </div>
                  )
                : null 
            }
          </Card>
          
          <Card >
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                <ExpandMoreIcon />
              </IconButton>
              <Typography variant="subheading" color="textSecondary">
                  Сюжет
              </Typography>
              <div style={{marginLeft:'auto'}}>
              {
                movie.imdb_href !== null  && movie.imdb_href !== 'nopage'
                  ? (
                      <a href={movie.imdb_href} target="_blank" style={{textDecoration: 'none'}}>
                        <Button size="small">imdb</Button> 
                      </a>
                    )
                  : null
              }
              <a href={movie.kp_url} target="_blank" style={{textDecoration: 'none'}}>
                <Button size="small">кинопоиск</Button> 
              </a>
              
              </div>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph variant="body2">
                 
                  {movie.desc == null ? 'Убийца садовник' : movie.desc }
                </Typography>
              </CardContent>
            </Collapse>
          </Card>

          <Card style={{marginBottom: 50}}>
            {
              !movie.movie_url
              ? <img src={tempImg} alt={movie.name} style={{cursor: 'pointer'}}/>
              : (
                <Iframe 
                  url={movie.movie_url}
                  maxWidth="610px"
                  height="370px"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"
                  allowFullScreen
                  
                />
              )
            }   
          </Card>
          <div>
           <CommentList />
          </div>
          <Poster max_picture={movie.max_picture} open={this.state.open} handleToggle={this.handleToggle}/>
        </div>
   
      </Fade>
      )

  return (
    <div>
      { content }
    </div>
  )
 }
}

const mapStateToProps = state =>({
  isLoading: state.movies.isLoading,
  movieDesc: state.movies.movieDesc
})

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Movie))

