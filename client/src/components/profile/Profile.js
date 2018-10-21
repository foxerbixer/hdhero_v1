import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { createProfile, getProfile } from '../../redux/ducks/auth'
import Fade from '@material-ui/core/Fade'
import ProfileForm from './ProfileForm'

const styles = {
  card: {
    maxWidth: 345,
    marginBottom: 40,
  },
  media: {
    marginBottom: 20,
    height: 'auto',
  },
  content: {
    textAlign: 'center'
  }
}

class Profile extends React.Component  {

  componentDidMount() {
    const userId = localStorage.getItem('qwertyID')
    this.props.getProfile(userId)
  }


  hadnleSubmit = ({ava, name}) => {
    this.props.createProfile(this.props.user.user.uid, ava, name, this.props.user.user.email)
    this.props.getProfile(this.props.user.user.uid)
  }

  render() {
    const { classes, user } = this.props

    let targetUser = user.user
    let userinfo = user.userinfo
    let email
    let username
    let emailVerified

    if (targetUser !== null && targetUser.email !== undefined) {
      email = targetUser.email
      emailVerified = targetUser.emailVerified
    }


    if (userinfo !== null && userinfo !== undefined && userinfo.username !== null) {
      username = userinfo.username
    }

    if (targetUser !== null) {
      localStorage.removeItem('qwertyID')
      localStorage.setItem('qwertyID', this.props.user.user.uid)
    }

    let content
      this.props.user.isLoading
        ? content = null
        : content = (
          <div>
            <Typography style={{textAlign:'center', marginBottom: 30}} variant="display1">
              Ваш профиль
            </Typography>
            
            <Card className={classes.card}>
              <CardActionArea>
                {
                  user.userinfo !== undefined && user.userinfo !== null
                  ? <Fade in={true}>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        className={classes.media}
                        image={user.userinfo.profile_picture}
                      />
                    </Fade>
                    : null
                }
                <CardContent >
                  <Typography gutterBottom variant="subheading" component="h2"  >
                    { email !== undefined ? (<span>Почта: {email} </span>) : null}
                  </Typography>
                  <Typography component="p" variant="subheading" >
                    { username !== undefined ? (<span>Имя: {username} </span>) : null}
                  </Typography>
                </CardContent>
                {
                    emailVerified === false 
                    ? (
                      <Typography component="p" variant="subheading" color="secondary" className={classes.content}>
                        Вам выслали письмо. Подтвердите почту, 
                        чтобы пользоваться всему возможносями сайта
                      </Typography>
                    )
                    : null
                  }
              </CardActionArea>
                  
            </Card>
            {
              emailVerified === true
                ? (
                  <div style={{display:'flex', justifyContent:'center'}}>
                    <ProfileForm onSubmit={this.hadnleSubmit}/>
                  </div>
                )
                : null
            }
          </div>
        )

    return (
      <div>
    
      { content }
       
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.auth
})


export default connect(mapStateToProps, { createProfile, getProfile })(withStyles(styles)(Profile ))