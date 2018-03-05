export const VOTE_POST = 'VOTE_POST'

export function votePost({upVote, postId}) {
  return {
    type: VOTE_POST,
    upVote,
    postId
  }
}
