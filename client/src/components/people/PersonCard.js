import React from 'react'
import Card from '@material-ui/core/Card'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});


const PersonCard = ({person, style, key}) => {

  return (
      <div style={{color: 'white', textAlign: 'left', overflow: 'hidden', ...style}} >
        <Card >{person.firstname}</Card>
        <Card >{person.lastname}</Card>
        <Card >{person.email}</Card>
      </div>
  )
}

export default PersonCard


