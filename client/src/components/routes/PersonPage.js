import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Route } from 'react-router-dom' 
import { connect } from 'react-redux'
import { addPerson } from '../../redux/ducks/people'
import Spinner from '../common/Spinner'
import PeopleForm from '../auth/PeopleForm'
import Fade from '@material-ui/core/Fade'

const styles = {
  root: {
    color: 'white'
  }
} 

class PersonPage extends Component {

  handlePeople = person => this.props.addPerson(person)
  
  render() {

    const { classes, isLoading } = this.props
    let content
    
    isLoading
      ? content = <Spinner />
      : content = (
        <Route path="/person" render={() => <PeopleForm onSubmit={this.handlePeople} />} />
      )

    return (
      <Fade in={true}>
        <div className={classes.root}>
          <h2 style={{textAlign: 'center'}}>Person Page</h2>   
          { content }
        </div>
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.people.isLoading,
  auth: state.auth
})

export default connect(mapStateToProps, { addPerson })(withStyles(styles)(PersonPage))

