import axios from 'axios'
import { setAlert } from './alert'
import { GET_POSTS, POST_FAILURE } from './types'
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
