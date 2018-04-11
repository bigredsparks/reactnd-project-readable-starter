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

export function votePost({postId, upVote}) {
  return {
    type: VOTE_POST,
    postId,
    upVote
  }
}

export function createPost({newPost}) {
  return {
    type: CREATE_POST,
    newPost,
  }
}

export function removePost({postId}) {
  return {
    type: REMOVE_POST,
    postId,
  }
}

export function modifyPost({modifiedPost}) {
  return {
    type: MODIFY_POST,
    modifiedPost
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

export function voteComment({commentId, upVote}) {
  return {
    type: VOTE_COMMENT,
    commentId,
    upVote
  }
}

export function createComment({newComment}) {
  return {
    type: CREATE_COMMENT,
    newComment,
  }
}

export function removeComment({commentId}) {
  return {
    type: REMOVE_COMMENT,
    commentId,
  }
}


export function modifyComment({modifiedComment}) {
  return {
    type: MODIFY_COMMENT,
    modifiedComment
  }
}

