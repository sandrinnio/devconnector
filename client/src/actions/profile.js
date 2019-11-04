import axios from 'axios'
import { setAlert } from '../actions/alert'
import { GET_PROFILE, PROFILE_FAILURE, UPDARE_PROFILE } from './types'
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

export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`${apiUrl}/api/profile`, formData, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

    if (!edit) {
      history.push('/dashboard')
    }
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`${apiUrl}/api/profile/experience`, formData, config)

    dispatch({
      type: UPDARE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'))

    history.push('/dashboard')
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`${apiUrl}/api/profile/education`, formData, config)

    dispatch({
      type: UPDARE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Added', 'success'))

    history.push('/dashboard')
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_FAILURE,
      payload: { msg: error.response.data.msg, status: error.response.status }
    })
  }
}
