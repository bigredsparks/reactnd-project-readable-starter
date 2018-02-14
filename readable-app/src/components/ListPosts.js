import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { timestampToStr } from '../utils/dateUtils'

class ListPosts extends Component {
  render() {
    const { posts } = this.props

    return (
      <div className="ListPosts">
        <div className="categories">
          Categories
          <div className="category-list">
            <ul>
              <li><Link to='/react'>React</Link></li>
              <li><Link to='/redux'>Redux</Link></li>
              <li><Link to='/udacity'>Udacity</Link></li>
            </ul>
          </div>
        </div>
        <div className="posts">
          Posts
          <div className="post-list">
          <ul>
            {posts.map((post) => (
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

export default ListPosts;
