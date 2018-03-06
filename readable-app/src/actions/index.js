export const VOTE_POST = 'VOTE_POST'

export function votePost({postId, upVote}) {
  //console.log("votePost", postId, upVote)
  return {
    type: VOTE_POST,
    postId,
    upVote
  }
}
