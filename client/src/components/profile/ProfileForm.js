import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import TextField from '../common/TextField'
import validator from 'validator'
import SendIcon from '@material-ui/icons/Send'

const styles = theme => ({

  button: {
    marginTop: 40,
  },
  input: {
    display: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class ProfileForm extends Component {
  render() {

    const { classes } = this.props
 
    return (
      <form onSubmit={this.props.handleSubmit} >
        <div>
          <Field name="name" component={TextField} label="Имя" type="text" />
        </div>

        <div>
          <Field name="ava" component={TextField} label="Ссылка на фото" type="text" />
        </div>
  
        <div style={{display:'flex',  justifyContent:'center', paddingTop: 20}}>
          <Button variant="contained" color="primary" className={classes.button} type="submit">
            Сохранить
            <SendIcon className={classes.rightIcon}/>
          </Button>
        </div>
      </form>
    )
  }
}

const validate = ({name, ava}) => {
  const errors = {}
  if (!name) errors.name = 'Имя обязательно'
  else if (!validator.isLength(name, {min: 2, max: 15})) errors.name = `Имя невалидно`

  if (!ava) errors.ava = 'Фото обязательно'
  else if (!validator.isURL(ava)) errors.ava = `Ссылка невалидна`

  return errors
}

const mapStateToForm = {
  form: 'profile', validate
}

export default reduxForm(mapStateToForm)(withStyles(styles)(ProfileForm))
