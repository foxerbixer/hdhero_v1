import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MoviesList from '../movies/MoviesList'
import DesiredList from '../movies/DesiredList'
import Western from '../movies/Western'
import Art from '../movies/Art'
import Crime from '../movies/Crime'
import Fantastic from '../movies/Fantastic'
import Horror from '../movies/Horror'
import Shorts from '../movies/Shorts'
import Family from '../movies/Family'
import Action from '../movies/Action'
import Adventure from '../movies/Adventure'
import Comedy from '../movies/Comedy'
import Musical from '../movies/Musical'
import Childish from '../movies/Childish'
import Ours from '../movies/Ours'
import Fantasy from '../movies/Fantasy'
import Military from '../movies/Military'
import Drama from '../movies/Drama'
import Melodrama from '../movies/Melodrama'
import Historical from '../movies/History'
import Travels from '../movies/Travels'
import Ukr from '../movies/Ukr'
import Biographical from '../movies/Biographical'
import Detective from '../movies/Detective'
import Sports from '../movies/Sports'
import Triller from '../movies/Triller'
import Documentary from '../movies/Documentary'
import Informative from '../movies/Informative'
import Foreign from '../movies/Foreign'
import PersonPage from '../routes/PersonPage'
import Modal from '../Modal'
import PeopleList from '../people/peopleList'
import AuthPage from '../routes/AuthPage'
import AdminPage from '../routes/AdminPage'
import PrivateRoute from '../common/PrivateRoute'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Movie from '../Movie'
import Profile from '../profile/Profile'
import AdminRoute from '../common/AdminRoute'


const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100
  },
  pagWrapper: {
    paddingTop: 50,
    paddingBottom: 50
  }
})

const MainLayout = props => {
  const { classes } = props
  return (
    <div>
      <Route exact path="/" component={MoviesList} />
      <Route exact path="/all-movies" component={MoviesList} />
      <Route exact path="/western" component={Western} />
      <Route exact path="/art" component={Art} />
      <Route exact path="/crime" component={Crime} />
      <Route exact path="/fantastic" component={Fantastic} />
      <Route exact path="/horror" component={Horror} />
      <Route exact path="/shorts" component={Shorts} />
      <Route exact path="/family" component={Family} />
      <Route exact path="/action" component={Action} />
      <Route exact path="/adventure" component={Adventure} />
      <Route exact path="/comedy" component={Comedy} />
      <Route exact path="/musical" component={Musical} />
      <Route exact path="/childish" component={Childish} />
      <Route exact path="/ours" component={Ours} />
      <Route exact path="/fantasy" component={Fantasy} />
      <Route exact path="/military" component={Military} />
      <Route exact path="/drama" component={Drama} />
      <Route exact path="/melodrama" component={Melodrama} />
      <Route exact path="/historical" component={Historical} />
      <Route exact path="/travels" component={Travels} />
      <Route exact path="/ukr" component={Ukr} />
      <Route exact path="/biographical" component={Biographical} />
      <Route exact path="/detective" component={Detective} />
      <Route exact path="/sports" component={Sports} />
      <Route exact path="/triller" component={Triller} />
      <Route exact path="/documentary" component={Documentary} />
      <Route exact path="/informative" component={Informative} />
      <Route exact path="/foreign" component={Foreign} />
      <Route exact path="/desired" component={DesiredList} />
    

      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify='center' className={classes.pagWrapper} >
            <Route exact path="/person" component={PersonPage} />
            <Route exact path="/modal" component={Modal} />
            {/* <Route exact path="/people" component={PeopleList} /> */}
            <Route path="/auth" component={AuthPage} />
            <Route exact path="/movie" component={Movie} />



            <Switch>
              <PrivateRoute exact path="/auth/profile" component={Profile}/>
              <AdminRoute exact path="/admin/people" component={PeopleList} />
            </Switch>
    

            {/* <Route exact path="/auth/profile" component={Profile} /> */}
                  {/* <Btn /> */}
            {/* <PrivateRoute exact path="/admin" component={AdminPage}/> */}
           
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}


export default withStyles(styles)(MainLayout)
