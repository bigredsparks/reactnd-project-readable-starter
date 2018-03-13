export const VOTE_POST = 'VOTE_POST'
export const CREATE_POST = 'CREATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const MODIFY_POST = 'MODIFY_POST'

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

