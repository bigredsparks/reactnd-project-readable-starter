import { combineReducers } from 'redux'
import * as ACTIONS from '../actions/types'

// let initialPostState = [
//   {
//     id: '1',
//     timestamp: 1518727586111,
//     title: 'Title 1',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     author: 'Vince Sparks',
//     category: 'react',
//     voteScore: 3,
//     deleted: false,
//     comments: []
//   },
//   {
//     id: '2',
//     timestamp: 1518727603372,
//     title: 'Title 2',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     author: 'Brad Rosse',
//     category: 'redux',
//     voteScore: 2,
//     deleted: false,
//     comments: []
//   },
//   {
//     id: '3',
//     timestamp: 1518727613372,
//     title: 'Title 3',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     author: 'Nick Wignall',
//     category: 'udacity',
//     voteScore: 1,
//     deleted: false,
//     comments: []
//   },
// ]


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
    // case INIT_COMMENTS:
    //    console.log("api comments", initComments)
    //    const newstate = [...state, ...initComments]
    //    return newstate
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

//export default post
