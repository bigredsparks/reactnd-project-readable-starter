import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class ListPosts extends Component {

  timestampToStr = (timestamp) => {
    return moment(timestamp).format("MM/DD/YYYY h:mm:ss a")
  }

  render() {
    const { posts } = this.props

    return (
      <div className="ListPosts">
        <div className="categories">
          Categories
          <div className="category-list">
            <ul>
              <li><Link to='/category'>React</Link></li>
              <li><Link to='/category'>Redux</Link></li>
              <li><Link to='/category'>React</Link></li>
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
                  {this.timestampToStr(post.timestamp)}: category:{post.category} author:{post.author} - {post.title} - {post.body}
                  <Link to='/detail'>View</Link>
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
