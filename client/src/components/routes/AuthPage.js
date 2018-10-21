import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import SignInForm from '../auth/SignInForm'
import SignUpForm from '../auth/SignUpForm'
import { Route } from 'react-router-dom' 
import { connect } from 'react-redux'
import { signUp, signIn, signInWithGoogle } from '../../redux/ducks/auth'
import Spinner from '../common/Spinner'

const styles = {
  root: {
    color: 'white'
  }
}

class AuthPage extends Component {

  handlePeople = person => this.props.addPerson(person)
  
  handleSignUp = ({email, password}) => this.props.signUp(email, password)

  handleSignIn = ({email, password }) => this.props.signIn(email, password)

  handleWithGoogle = () => this.props.signInWithGoogle()
  

  render() {

    const { classes, isLoading } = this.props
    let content
    isLoading
      ? content = (
        <Spinner />
      )
      : content = (
        <div>
          <Route path="/auth/signin" render={() => <SignInForm
            onSubmit={this.handleSignIn} 
            google={this.handleWithGoogle}
          />}/>
          
          <Route path="/auth/signup" render={() => <SignUpForm
            onSubmit={this.handleSignUp}
            google={this.handleWithGoogle}
          />}/>
        </div>
      )


    return (
      <div >
        { content }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, { signUp, signIn, signInWithGoogle })(withStyles(styles)(AuthPage))

