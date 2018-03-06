import { VOTE_POST } from '../actions'

const initialPostState = [
  {
    id: '1',
    timestamp: 1518727586111,
    title: 'Title 1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'Vince Sparks',
    category: 'react',
    voteScore: 1,
    deleted: false,
    comments: []
  },
  {
    id: '2',
    timestamp: 1518727603372,
    title: 'Title 2',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'Brad Rosse',
    category: 'redux',
    voteScore: 1,
    deleted: false,
    comments: []
  },
  {
    id: '3',
    timestamp: 1518727613372,
    title: 'Title 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'Nick Wignall',
    category: 'udacity',
    voteScore: 1,
    deleted: false,
    comments: []
  },
]

function post (state = initialPostState, action) {
  const { postId, upVote } = action
  console.log("action:", action)
  switch (action.type) {
    case VOTE_POST:
      // map through each post and inc/dec vote score based on up vote
      const newState = state.map((post) => {
        if (post.id === postId) {
          upVote ? post.voteScore++ : post.voteScore && post.voteScore--
        }
        return post
      })
      return newState;
    default:
      return state
  }
}

export default post
