import React from 'react';
import withRoot from '../withRoot'
import NavBar from './layout/NavBar'
import { Route } from 'react-router-dom'
import AuthPage from './routes/AuthPage'
import AdminPage from './routes/AdminPage'
import PrivateRoute from './common/PrivateRoute'
import PersonPage from './routes/PersonPage'
import Btn from './auth/btn'
import MoviesPage from './routes/MoviesPage'
import PeoplePage from './routes/PeoplePage'
import Modal from './Modal'

const Root = () => {

  return (
    <div>
      <NavBar />
      
    </div>
  )
}

export default withRoot(Root)
