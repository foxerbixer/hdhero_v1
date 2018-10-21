import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Comment from './CommentItem'
import { addComment, getComments } from '../../redux/ducks/comments'
import CommentForm from './CommentForm'

const styles = theme => ({
  comment: {  
    backgroundColor: theme.palette.background.paper,
    marginBottom: 30,
  },
  textField: {
    padding: 20,
    width:'100%',
    marginBottom: 20,
  }
})

class CommentsList extends React.Component {
  state = {
    comments: []
  }

  componentDidMount() {
    const movieRaw = localStorage.getItem('movie')
    const movie = JSON.parse(movieRaw)
    this.props.getComments && this.props.getComments(movie.kp_id)
  }

  componentWillUpdate(nextProps) {
    if(nextProps.comments.entities !== this.props.comments.entities){
      this.setState({
        comments: [ ...nextProps.comments.entities]
      })
    }
  }

  handleSubmit = ({comment}) => {
    if (this.props.auth.userinfo !== null && this.props.auth.userinfo  !== undefined) {
      const movieRaw = localStorage.getItem('movie')
      const movie = JSON.parse(movieRaw)
      this.props.addComment({...this.props.auth.userinfo, kp_id: movie.kp_id, date: Date.now(), ...{text: comment}})
      this.props.getComments && this.props.getComments(movie.kp_id)
    }
  }
 
  render() {
    const { classes } = this.props
    
    return (
      <div >
        {
          this.props.auth.user !== null &&
          this.props.auth.user.emailVerified === true &&
          this.props.auth.userinfo !== null 
           ? <CommentForm onSubmit={this.handleSubmit}/>
           : null
        }

        {this.state.comments.map((comment, i) => (
          <div className={classes.comment} key={i}>
            <Comment comment={comment} className={classes.comment}  />
          </div>
        
        ))}
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
  auth: state.auth
})


export default connect(mapStateToProps, { addComment, getComments })(withStyles(styles)(CommentsList))