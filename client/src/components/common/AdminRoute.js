import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'



const AdminRoute = ({ component: Component, auth, ...rest }) => (
  
  <Route
    {...rest}
    render = {props => {
      let userinfo
      if (auth.userinfo !== null && userinfo.email !== undefined) {
        userinfo = auth.userinfo.email
      }
      if (userinfo == 'foxerbixer@gmail.com') {
        return <Component {...props} />
      } else {
        return <Redirect to="/all-movies" /> 
      }

    }
      
 
    }
  />
  )

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AdminRoute)
