import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostDetail extends Component {
  render() {
    const { category, postId } = this.props
    console.log(category, postId)

    return (
      <div className="PostDetail">
        <Link to='/'>Home</Link>
        <div>Post Category: {category} {postId} </div>
      </div>
    );
  }
}

export default PostDetail;
