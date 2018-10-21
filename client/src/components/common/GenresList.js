import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CrimeIcon from '@material-ui/icons/LocalCarWash'
import WesternIcon from '@material-ui/icons/TransferWithinAStation'
import AdventureIcon from '@material-ui/icons/DirectionsBike'
import MelodramaIcon from '@material-ui/icons/FavoriteBorder'
import HorrorIcon from '@material-ui/icons/Visibility'
import DramaIcon from '@material-ui/icons/Hotel'
import DetectiveIcon from '@material-ui/icons/ZoomOut'
import MilitaryIcon from '@material-ui/icons/NextWeek'
import FantasticIcon from '@material-ui/icons/BrightnessLow'
import FantasyIcon from '@material-ui/icons/BrightnessHigh'
import TrillerIcon from '@material-ui/icons/Group'
import DocumentaryrIcon from '@material-ui/icons/Videocam'
import HistoryIcon from '@material-ui/icons/ChangeHistory'
import ChildishIcon from '@material-ui/icons/Pets'
import ActionIcon from '@material-ui/icons/WbAuto'
import ComedyIcon from '@material-ui/icons/LocalPlay'
import MusicalIcon from '@material-ui/icons/MusicNote'
import FamilyIcon from '@material-ui/icons/Home'
import ArtIcon from '@material-ui/icons/Spa'
import OursIcon from '@material-ui/icons/NaturePeople'
import InformativeIcon from '@material-ui/icons/School'
import TravelsIcon from '@material-ui/icons/AirportShuttle'
import UkrIcon from '@material-ui/icons/Nature'
import BiographicalIcon from '@material-ui/icons/Create'
import SportIcon from '@material-ui/icons/FitnessCenter'
import ForeignIcon from '@material-ui/icons/Translate'
import ShortsIcon from '@material-ui/icons/ColorLens'
import { Link, Route } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'


const styles = theme => ({
  button: {
    display: 'flex',
    margin: 'auto'
  }
})


class GenresList extends Component {
  constructor(){
    super()
    this.state = {
      isOpen: false
    }
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
  
  render() {
    const { classes } = this.props

    let main_elements

     this.state.isOpen ?
      main_elements = (
      <Fade in={true}>
        <List> 
          <Link to="/melodrama" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <MelodramaIcon />
            </ListItemIcon>
            <ListItemText primary="мелодрамы" />
          </ListItem>
        </Link>
        <Link to="/travels" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <TravelsIcon />
            </ListItemIcon>
            <ListItemText primary="путешествия" />
          </ListItem>
        </Link>
        <Link to="/western" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <WesternIcon />
              </ListItemIcon>
              <ListItemText primary="вестерны" />
            </ListItem>
          </Link>
        <Link to="/ukr" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <UkrIcon />
            </ListItemIcon>
            <ListItemText primary="украинские" />
          </ListItem>
        </Link>
        <Link to="/biographical" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <BiographicalIcon />
            </ListItemIcon>
            <ListItemText primary="Биографические" />
          </ListItem>
        </Link>
        <Link to="/sports" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <SportIcon />
            </ListItemIcon>
            <ListItemText primary="спортивные" />
          </ListItem>
        </Link>

        <Link to="/documentary" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <DocumentaryrIcon />
            </ListItemIcon>
            <ListItemText primary="документальные" />
          </ListItem>
        </Link>
        <Link to="/informative" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <InformativeIcon />
            </ListItemIcon>
            <ListItemText primary="познавательные" />
          </ListItem>
        </Link>
        <Link to="/foreign" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <ForeignIcon/>
            </ListItemIcon>
            <ListItemText primary="зарубежные" />
          </ListItem>
        </Link>
        <Link to="/shorts" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <ShortsIcon />
              </ListItemIcon>
              <ListItemText primary="кртметражные" />
            </ListItem>
          </Link>
          <Link to="/musical" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <MusicalIcon />
              </ListItemIcon>
              <ListItemText primary="мьюзиклы" />
            </ListItem>
          </Link>
          <Link to="/art" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <ArtIcon />
              </ListItemIcon>
              <ListItemText primary="арт-хаус" />
            </ListItem>
          </Link>
          <Link to="/ours" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <OursIcon />
              </ListItemIcon>
              <ListItemText primary="наши" />
            </ListItem>
          </Link>
      </List>
      </Fade> 
      )
      : null 

      let other_elements

      !this.state.isOpen
        ? other_elements = (

       <Fade in={true}>
        <List component="nav">  
          <Link to="/comedy" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <ComedyIcon />
              </ListItemIcon>
              <ListItemText primary="комедии" />
            </ListItem>
          </Link>
          <Link to="/fantastic" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <FantasticIcon />
              </ListItemIcon>
              <ListItemText primary="фантастика" />
            </ListItem>
          </Link>
          <Link to="/horror" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <HorrorIcon />
              </ListItemIcon>
              <ListItemText primary="ужасы" />
            </ListItem>
          </Link>
          <Link to="/action" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <ActionIcon />
              </ListItemIcon>
              <ListItemText primary="боевики" />
            </ListItem>
          </Link>
          <Link to="/detective" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <DetectiveIcon />
            </ListItemIcon>
            <ListItemText primary="детективы" />
          </ListItem>
        </Link>
          <Link to="/crime" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <CrimeIcon />
              </ListItemIcon>
              <ListItemText primary="криминал" />
            </ListItem>
          </Link>
          <Link to="/adventure" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <AdventureIcon />
              </ListItemIcon>
              <ListItemText primary="приключения" />
            </ListItem>
          </Link>
          <Link to="/triller" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <TrillerIcon />
            </ListItemIcon>
            <ListItemText primary="триллеры" />
          </ListItem>
        </Link>
        <Link to="/fantasy" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <FantasyIcon />
              </ListItemIcon>
              <ListItemText primary="фэнтези" />
            </ListItem>
          </Link>
          <Link to="/drama" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <DramaIcon />
              </ListItemIcon>
              <ListItemText primary="драмы" />
            </ListItem>
          </Link>
          <Link to="/childish" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <ChildishIcon />
              </ListItemIcon>
              <ListItemText primary="детские" />
            </ListItem>
          </Link>
          <Link to="/military" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <MilitaryIcon />
              </ListItemIcon>
              <ListItemText primary="военные" />
            </ListItem>
          </Link>
          <Link to="/family" style={{textDecoration: 'none'}}>
            <ListItem button >
              <ListItemIcon>
                <FamilyIcon />
              </ListItemIcon>
              <ListItemText primary="семейные" />
            </ListItem>
          </Link>
          <Link to="/historical" style={{textDecoration: 'none'}}>
          <ListItem button >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="исторические" />
          </ListItem>
         </Link>  

        </List>
            </Fade>
        )
        : null
      

    return (
      <div>
        <Button
          fullWidth={true}
          variant="outlined"
          color="inherit"
          size="large"
          className={classes.button}
          onClick={this.toggleOpen}
        >
          
           { !this.state.isOpen ? <span>другие жанры</span> : <span>главные жанры</span>}
         
        </Button>
        {main_elements}
        {other_elements}
      </div>
    
    )
  }
}

export default withStyles(styles)(GenresList)
