export const GET_POSTS = 'GET_POSTS'
//export const INIT_POSTS = 'INIT_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const CREATE_POST = 'CREATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const MODIFY_POST = 'MODIFY_POST'

//export const INIT_COMMENTS = 'INIT_COMMENTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const MODIFY_COMMENT = 'MODIFY_COMMENT'

export const GET_POST = 'GET_POST'

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function getPost(post) {
  return {
    type: GET_POST,
    post
  }
}

// export function initPosts(posts) {
//   return {
//     type: INIT_POSTS,
//     posts
//   }
// }

export function votePost(post) {
  return {
    type: VOTE_POST,
    post,
  }
}

export function createPost(post) {
  return {
    type: CREATE_POST,
    post,
  }
}

export function removePost(post) {
  return {
    type: REMOVE_POST,
    post,
  }
}

export function modifyPost(post) {
  return {
    type: MODIFY_POST,
    post
  }
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

// export function initComments(initComments) {
//   return {
//     type: INIT_COMMENTS,
//     initComments
//   }
// }

export function voteComment(comment) {
  return {
    type: VOTE_COMMENT,
    comment,
  }
}

export function createComment(comment) {
  return {
    type: CREATE_COMMENT,
    comment,
  }
}

export function removeComment(comment) {
  return {
    type: REMOVE_COMMENT,
    comment,
  }
}

export function modifyComment(comment) {
  return {
    type: MODIFY_COMMENT,
    comment
  }
}

