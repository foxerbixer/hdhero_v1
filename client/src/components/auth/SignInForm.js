import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import TextField from '../common/TextField'
import emailValidator from 'email-validator'
import validator from 'validator'

import GoogleButton from 'react-google-button'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'


const styles = theme => ({
  root: {
    color: 'red',
    padding: 30
  },
  card: {
    textAlign: 'center'
    
  },
  button: {
    margin: theme.spacing.unit,
  }
})

class SignInForm extends Component {
  render() {

    const { classes, handleSubmit, google } = this.props

    return (
      <Fade in={true}>
        <Card className={classes.card}>
          <Typography variant="headline" color="primary">войти</Typography>
          <form className={classes.root} onSubmit={handleSubmit}>
            <div>
              <Field name="email" component={TextField} label="Email" type="email" />
            </div>
            <div style={{marginBottom: 40}}>
              <Field name="password" component={TextField} label="Password" type="password" />
            </div>
            <div style={{marginBottom: 15}}>
              <Button type="submit" variant="outlined">
                  подтвердить
              </Button>
            </div>
            <Typography color="secondary" variant="subheading" style={{marginBottom: 40}}>или</Typography >
            <div>
              <Button variant="outlined" onClick={google}>
                <GoogleButton  type="light" />
              </Button>
            </div>
          </form>
        </Card>
      </Fade>
    )
  }
}

const validate = ({password, email}) => {
  const errors = {}
  if (!email) errors.email = 'email обязателен'
  else if (!emailValidator.validate(email)) errors.email = `email невалиден`

  if (!password) errors.password = 'пароль обязателен'
  else if (!validator.isLength(password, { min: 6, max: 30 })) errors.password = `пароль невалиден`
  return errors
}

const mapStateToForm = {
  form: 'signIn', validate
}

export default reduxForm(mapStateToForm)(withStyles(styles)(SignInForm))
