import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../redux/ducks/auth'
import { Link } from 'react-router-dom'


class btn extends Component {

  render() {

    const { user, signOut } = this.props
    const bttn = user
      ? <button onClick={signOut} >Sign out</button>
      : <Link to="/auth/signin">Sign in</Link>

    return (
      <div style={{color: 'white'}}>
        {bttn}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})



export default connect(mapStateToProps, { signOut })(btn)
