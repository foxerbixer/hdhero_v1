import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'

const styles = {
  card: {
    width: 200,
    height: 438,
    position: 'relative'
  },
  handlers: {
    position: 'absolute',
    bottom: 0
  }
}

const MovieItem = props => {

  const { classes, movieInfo, handleMovie  } = props
  const updateYear = movieInfo.year.replace('премьера','')

  return (
    <Fade in={true}>
      <Grid item>
        <Card className={classes.card} onClick={handleMovie}>
          <CardActionArea>
            <CardMedia
              component="img"
              className={classes.media}
              height="300"
              width="200"
              src={movieInfo.mini_picture}
            />

            <CardContent>
              <Typography component="p" style={{textAlign: 'center'}} >
                {movieInfo.name}
              </Typography>
              <Typography component="p" style={{textAlign: 'center'}} >
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.handlers}>
            <Button size="small" color="primary" >
              Watch
            </Button>
            <span />
            <span />
            <span />
            <Button color="secondary" >
              {updateYear}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Fade> 
  )
}

MovieItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MovieItem);