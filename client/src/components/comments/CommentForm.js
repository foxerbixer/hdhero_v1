import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'
import TextField from '../common/TextField'
import validator from 'validator'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    color: 'red',
    padding: 30,
    width: '100%'
  },
  card: {
    textAlign: 'center'
    
  },
  textField: {
    padding: 20,
    width:'100%',
    marginBottom: 20,
  }
})

class CommentForm extends Component {
  render() {

    const { classes, handleSubmit  } = this.props

    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <div style={{marginBottom: 10}}>
          <Field name="comment" component={TextField}  type="text" placeholder="Оставьте комментарий" multiline rowsMax="4" style={{width: '100%'}}/>
        </div>
        <Button size="small" type="submit" style={{display:'flex', marginLeft:'auto'}}>отправить</Button>
      </form>
    )
  }
}

const validate = ({comment}) => {
  const errors = {}
  if (!comment) errors.comment = 'шота не так'

  else if (!validator.isLength(comment, { min: 4, max: 140 })) errors.comment = `хм, шота не так`
  return errors
}

const mapStateToForm = {
  form: 'comment', validate
}

export default reduxForm(mapStateToForm)(withStyles(styles)(CommentForm))
