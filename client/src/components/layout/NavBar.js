import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { Link } from 'react-router-dom'
import MainLayout from './MainLayout'
import GenresList from '../common/GenresList'
import Search from '../common/Search'
import AuthMenu from '../auth/AuthMenu'


const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    overflow:'auto',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },


})

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileOpen: false,
  }


  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  }

  // hadnleAllMovies = () => {
  //   this.props.toAllMovies(this.props.history)
  // }

  render() {
    const { classes, theme } = this.props;
   
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <GenresList />
      </div>
    )

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
          <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <div style={{display:'flex'}}>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to="/all-movies" style={{textDecoration:'none', color:'white'}}>HDHERO</Link>
            </Typography>
            </div>
            <div style={{display:'flex', marginRight: 'auto'}}>
              <Search />
            </div>
            
            <AuthMenu />
           
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content} >
          <div className={classes.toolbar} />        
          <MainLayout />
        </main>
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToPtops = state => ({

})


export default withStyles(styles, { withTheme: true })(NavBar)


