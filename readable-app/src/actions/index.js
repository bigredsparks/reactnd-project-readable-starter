import * as ACTIONS from './types'

export function getCategories(categories) {
  return {
    type: ACTIONS.GET_CATEGORIES,
    categories
  }
}

export function getPosts(posts) {
  return {
    type: ACTIONS.GET_POSTS,
    posts
  }
}

export function getPost(post) {
  return {
    type: ACTIONS.GET_POST,
    post
  }
}

export function votePost(post) {
  return {
    type: ACTIONS.VOTE_POST,
    post,
  }
}

export function createPost(post) {
  return {
    type: ACTIONS.CREATE_POST,
    post,
  }
}

export function removePost(post) {
  return {
    type: ACTIONS.REMOVE_POST,
    post,
  }
}

export function modifyPost(post) {
  return {
    type: ACTIONS.MODIFY_POST,
    post
  }
}

export function getComments(comments) {
  return {
    type: ACTIONS.GET_COMMENTS,
    comments
  }
}

export function voteComment(comment) {
  return {
    type: ACTIONS.VOTE_COMMENT,
    comment,
  }
}

export function createComment(comment) {
  return {
    type: ACTIONS.CREATE_COMMENT,
    comment,
  }
}

export function removeComment(comment) {
  return {
    type: ACTIONS.REMOVE_COMMENT,
    comment,
  }
}

export function modifyComment(comment) {
  return {
    type: ACTIONS.MODIFY_COMMENT,
    comment
  }
}
