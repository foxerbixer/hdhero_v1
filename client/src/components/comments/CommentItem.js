import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux'
import { deleteComment, getComments } from '../../redux/ducks/comments'

class CommentItem extends React.Component {

  handleDelete = () => {
    this.props.deleteComment(this.props.comment.text, this.props.comment.kp_id)
    this.props.getComments(this.props.comment.kp_id)
  }

  render() {

    const { comment } = this.props
    let email
    if (this.props.auth.userinfo !== null && this.props.auth.userinfo.email === comment.email) {
      email = true
    } else {
      email = false
    }

    return (
      <Fade in={true} {...this.props}>
        <div >
          <div style={{display:'flex', justifyContent:'center', padding: 15}}>
            <div style={{display:'flex', alignSelf: 'center', marginRight: 'auto', paddingRight: 15, marginTop:20}}>
              <Avatar src={comment.profile_picture}/>
            </div>
            <div style={{display:'flex', alignSelf: 'center', marginTop:20}}>
              <Typography variant="subheading" >{ comment.text }</Typography> 
            </div>
            { email !== false
              ? (
                <div style={{display:'flex', alignSelf: 'center', marginTop:20}}>
                  <IconButton  aria-label="Delete" color="primary" onClick={this.handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )
              : null
            }
          </div>
          <div style={{display:'flex'}}>
            <Typography variant="body1" color="inherit" type="date" style={{display:'flex', marginLeft:'auto', paddingRight: 30}} >
              <Moment format='MMMM Do YYYY' style={{display:'flex'}}>
                { comment.date }
              </Moment>
            </Typography>
          </div>
        </div>
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment, getComments })(CommentItem)
