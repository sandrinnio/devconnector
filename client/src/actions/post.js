import axios from 'axios'
import { setAlert } from './alert'
import {
  GET_POSTS,
  GET_POST,
  POST_FAILURE,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types'
import { apiUrl } from '../config/default'

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`${apiUrl}/api/posts`)

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}

export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`${apiUrl}/api/posts/like/${postId}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    })
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}

export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`${apiUrl}/api/posts/unlike/${postId}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    })
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}

export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`${apiUrl}/api/posts/${postId}`)

    dispatch({
      type: DELETE_POST,
      payload: postId
    })

    dispatch(setAlert('Post Removed', 'success'))
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}

export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`${apiUrl}/api/posts`, formData, config)

    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    dispatch(setAlert('Post Created', 'success'))
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}

export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`${apiUrl}/api/posts/${id}`)

    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`${apiUrl}/api/posts/comment/${postId}`, formData, config)

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })

    dispatch(setAlert('Comment Added', 'success'))
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`${apiUrl}/api/posts/comment/${postId}/${commentId}`)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })

    dispatch(setAlert('Comment Removed', 'success'))
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}
