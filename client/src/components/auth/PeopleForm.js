import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import TextField from '../common/TextField'
import emailValidator from 'email-validator'
import validator from 'validator'

const styles = theme => ({
  root: {
    color: 'red'
  },
  button: {
    margin: theme.spacing.unit,
  }
})

class PeopleForm extends Component {
  render() {

    const { classes } = this.props
 
    return (
      <form className={classes.root} onSubmit={this.props.handleSubmit} >
        <div>
          <Field name="firstname" component={TextField} label="First Name" type="text" />
        </div>
        <div>
          <Field name="lastname" component={TextField} label="Last Name" type="text" />
        </div>
        <div>
          <Field name="email" component={TextField} label="Email" type="email" />
        </div>
        <div >
          <Button type="submit" variant="outlined" style={{marginLeft: 75, marginTop: 50}}>
              Sumbit
          </Button>
        </div>
      </form>
    )
  }
}

const validate = ({firstname, lastname, email}) => {
  const errors = {}
  if (!firstname) errors.firstname = 'first name is required'
  else if (!validator.isLength(firstname, {min: 2, max: 15})) errors.firstname = `first name isn't valid`

  if (!lastname) errors.lastname = 'last name is required'
  else if (!validator.isLength(lastname, {min: 2, max: 15})) errors.lastname = `first name isn't valid`

  if (!email) errors.email = 'email is required'
  else if (!emailValidator.validate(email)) errors.email = `email isn't valid`

  return errors
}

const mapStateToForm = {
  form: 'people', validate
}

export default reduxForm(mapStateToForm)(withStyles(styles)(PeopleForm))
