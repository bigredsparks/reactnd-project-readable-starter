import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'

class ListPosts extends Component {
  render() {
    const { posts, categories } = this.props

    return (
      <div className="ListPosts">
        <div className="categories">
          Categories
          <div className="category-list">
            <ul>
              {categories.map((category) =>(
                <li><Link to={`/${category}`}>{capitalize(category)}</Link></li>
              ))}
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
