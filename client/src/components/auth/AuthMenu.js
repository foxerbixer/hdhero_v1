import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link } from 'react-router-dom'
import { signOut, getProfile } from '../../redux/ducks/auth'
import Avatar from '@material-ui/core/Avatar'


class AuthMenu extends Component {
  
  state = {
    anchorEl: null
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.user.user !== this.props.user.user){
      if (nextProps.user.user !== null && nextProps.user.user.uid !== undefined) {
        nextProps.getProfile(nextProps.user.user.uid)
      }
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  signOutRigtNow = () => {
    this.props.signOut()
    this.setState({ anchorEl: null })
  }


  render() {

    const { anchorEl } = this.state
    const { user } = this.props
    const open = Boolean(anchorEl)
    const { userinfo } = this.props.user

    let targetUser = user.user

    let photo
    if (targetUser !== null && targetUser.photoURL !== null) {
      photo = targetUser.photoURL
    }

    if (userinfo !== null && userinfo !== undefined && userinfo.profile_picture !== undefined) {
      photo = userinfo.profile_picture
    }
    
    let content 
    targetUser !== null
      ? content = (<div>
        <Link to='/auth/profile' style={{textDecoration:'none'}}>
          <MenuItem onClick={this.handleClose}>Мой профиль</MenuItem>
        </Link>
        <MenuItem onClick={this.signOutRigtNow}>Выйти</MenuItem>
      </div>)
      : content = (<div>
        <Link to='/auth/signup' style={{textDecoration:'none'}}>
          <MenuItem onClick={this.handleClose}>Регистрация</MenuItem>
        </Link>
        <Link to='/auth/signin' style={{textDecoration:'none'}}>
          <MenuItem onClick={this.handleClose}>Войти</MenuItem>
        </Link>
      </div>)
  

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"  
        >
          {photo !== undefined ?<Avatar src={photo}/> : <AccountCircle />}
        </IconButton>
        <Menu
         
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
        
          { content }
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth
})


export default connect(mapStateToProps, { signOut, getProfile })(AuthMenu)
