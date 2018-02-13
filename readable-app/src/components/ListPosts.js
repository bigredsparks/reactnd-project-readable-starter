import React, { Component } from 'react'
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
              <li>React</li>
              <li>Redux</li>
              <li>Udacity</li>
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
