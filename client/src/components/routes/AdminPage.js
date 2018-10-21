import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'


const styles = {
  root: {
    color: 'white'
  }
}


class AdminPage extends Component {
  render() {

    const { classes } = this.props

    return (
      <div >
        <h2 className={classes.root}>Admin page</h2>
      </div>
    )
  }
}

export default withStyles(styles)(AdminPage)

