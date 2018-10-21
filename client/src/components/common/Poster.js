import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
  }
})

const Poster = ({classes, max_picture, handleToggle, open }) => {
  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={handleToggle} style={{overflow: 'hidden'}}>
        <DialogActions >
          <img src={max_picture} width="568" height="820"/>

        </DialogActions>
      </Dialog>
    </div>
  )
}

Poster.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Poster)