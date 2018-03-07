export const VOTE_POST = 'VOTE_POST'
export const REMOVE_POST = 'REMOVE_POST'

export function votePost({postId, upVote}) {
  //console.log("votePost", postId, upVote)
  return {
    type: VOTE_POST,
    postId,
    upVote
  }
}

export function removePost({postId}) {
  return {
    type: REMOVE_POST,
    postId,
  }
}

