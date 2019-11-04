import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteComment } from '../../actions/post'

const CommentItem = ({ auth, deleteComment, postId, comment: { _id, text, name, avatar, user, date } }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile${user}`}>
          <img src={avatar} alt="Avatar" className="round-img"/>
        </Link>
        <h4>{name}</h4>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(postId, _id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
