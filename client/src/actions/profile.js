import axios from 'axios'
import { setAlert } from '../actions/alert'
import { GET_PROFILE, PROFILE_FAILURE } from './types'
import { apiUrl } from '../config/default'

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get(`${apiUrl}/api/profile/me`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}
