const api = "http://localhost:3001"

// Generate a unique token
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getPosts = () =>
fetch(`${api}/posts`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPostById = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const deletePostById = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  })

//  GET /posts/:id/comments
export const getPostComments = (postId) =>
fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.json())
  .then(data => data)
