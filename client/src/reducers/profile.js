import {
  GET_PROFILE,
  PROFILE_FAILURE,
  CLEAR_PROFILE,
  UPDARE_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
    case UPDARE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: null
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      }
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      }
    default:
      return state
  }
}
