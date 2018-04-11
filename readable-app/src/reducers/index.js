import { combineReducers } from 'redux'
import * as PostsApi from '../components/PostsApi'
import {
  GET_POSTS, VOTE_POST, CREATE_POST, REMOVE_POST, MODIFY_POST,
  GET_COMMENTS, VOTE_COMMENT, CREATE_COMMENT, REMOVE_COMMENT, MODIFY_COMMENT,
  GET_POST
} from '../actions'

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


let initialPostState = []

function posts (state = initialPostState, action) {
  console.log("posts action", action, state)
  const { postId, upVote, modifiedPost, newPost, posts } = action

  switch (action.type) {
    case GET_POSTS:
      return action.posts

    // case INIT_POSTS:
    //   console.log("api posts", posts)
    //   return [...state, ...posts]

    case VOTE_POST:
      // map through each post and inc/dec vote score based on up vote
      return state.map((post) => {
        if (post.id === postId) {
          upVote ? post.voteScore++ : post.voteScore--
        }
        return post
      })

    case CREATE_POST:
      return [...state, newPost]

    case REMOVE_POST:
      return state.map((post) => {
        if (post.id === postId) {
          return { ...post, deleted: true}
        }
        return post;
      })

    case MODIFY_POST:
      // map through each post and replace modified post
      return state.map((post) => {
        if (post.id === modifiedPost.id) {
          return modifiedPost
        }
        return post
      })

    default:
      return state
  }
}

function comments (state = [], action) {
  //console.log("comments action", action)
  const { commentId, upVote, modifiedComment, newComment, initComments } = action

  switch (action.type) {
    // case INIT_COMMENTS:
    //    console.log("api comments", initComments)
    //    const newstate = [...state, ...initComments]
    //    return newstate
    case GET_COMMENTS:
    console.log("action.comments", action.comments)
      return action.comments;

    case VOTE_COMMENT:
      // map through each post and each comment and inc/dec vote score based on up vote
      return state.map((comment) => {
        if (comment.id === commentId ) {
          upVote ? comment.voteScore++ : comment.voteScore--
        }
        return comment
      })

    case CREATE_COMMENT:
      return [...state, newComment]

    case REMOVE_COMMENT:
//      return state.filter((comment) => comment.id !== commentId);
      return state.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, deleted: true}
        }
        return comment;
      })

    case MODIFY_COMMENT:
      // map through each post and replace modified post
      return state.map((comment) => {
        if (comment.id === modifiedComment.id) {
          return modifiedComment
        }
        return comment
      })

    default:
      return state
  }
}

function post (state = {}, action) {
  switch (action.type) {
    case GET_POST:
      return action.post
      break;

    default:
      return state
  }
}

 export default combineReducers({
   posts,
   comments,
   post,
 })

//export default post
