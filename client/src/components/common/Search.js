import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import { getDesiredMovie, moviesSelector } from '../../redux/ducks/movies'

const styles = theme => ({
  
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },

  
})

class Search extends Component {

  state = {
    search_value: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.getDesiredMovie(this.state.search_value)
    this.setState({ search_value: '' })
  }

  handleChange = e => this.setState({ search_value: e.target.value })
  
  render() {
    const { classes } = this.props
    return (
      <Tooltip title='название режиссер год жанр' enterDelay={500} leaveDelay={200}>
      <form onSubmit={this.handleSubmit}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Input
            placeholder="Найти…"
            disableUnderline
            value={this.state.search_value}
            onChange={this.handleChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      </form>
      </Tooltip>
    )
  }
}

const mapSateToProps = state => ({
  movies: moviesSelector(state)
})

export default connect(mapSateToProps, { getDesiredMovie })(withStyles(styles)(Search))
