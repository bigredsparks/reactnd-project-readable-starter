export const VOTE_POST = 'VOTE_POST'
export const CREATE_POST = 'CREATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const MODIFY_POST = 'MODIFY_POST'

export const VOTE_COMMENT = 'VOTE_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const MODIFY_COMMENT = 'MODIFY_COMMENT'

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

