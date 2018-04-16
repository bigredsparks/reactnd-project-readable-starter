import { combineReducers } from 'redux'
import * as ACTIONS from '../actions/types'

function posts (state = [], action) {
  switch (action.type) {
    case ACTIONS.GET_POSTS:
      return action.posts

    case ACTIONS.CREATE_POST:
      return [...state, action.post]

    case ACTIONS.VOTE_POST:
    case ACTIONS.REMOVE_POST:
    case ACTIONS.MODIFY_POST:
    // map through each post and inc/dec vote score based on up vote
      return state.map((post) => {
        return post.id === action.post.id
        ? action.post
        : post
      })

    default:
      return state
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case ACTIONS.GET_COMMENTS:
      return action.comments;

    case ACTIONS.CREATE_COMMENT:
      return [...state, action.comment]

    case ACTIONS.VOTE_COMMENT:
    case ACTIONS.REMOVE_COMMENT:
    case ACTIONS.MODIFY_COMMENT:
      // map through each post and replace modified post
      return state.map((comment) => {
        return comment.id === action.comment.id
        ? action.comment
        : comment
      })

    default:
      return state
  }
}

function post (state = {}, action) {
  switch (action.type) {
    case ACTIONS.GET_POST:
    case ACTIONS.MODIFY_POST:
      return action.post

    default:
      return state
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case ACTIONS.GET_CATEGORIES:
      return action.categories.categories

    default:
      return state
  }
}

 export default combineReducers({
   posts,
   comments,
   post,
   categories
 })
