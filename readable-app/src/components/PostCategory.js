import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { timestampToStr } from '../utils/dateUtils'

class PostCategory extends Component {
  render() {
    const { posts, category } = this.props
    console.log(this.props)

    const shownPosts = posts.filter((post) => post.category === category)

    return (
      <div className="PostCategory">
        <Link to='/'>Home</Link>
        <div>Post Category: {category} </div>
        <div className="posts">
          Posts
          <div className="post-list">
          <ul>
            {shownPosts.map((post) => (
              <li key={post.id}>
                <div>
                  {timestampToStr(post.timestamp)}: category:{post.category} author:{post.author} - {post.title} - {post.body}
                  <Link to={`/${post.category}/${post.id}`}>View</Link>
                </div>
              </li>
            ))}
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default PostCategory;
