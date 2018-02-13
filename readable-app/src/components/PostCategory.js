import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostCategory extends Component {
  render() {
    return (
      <div className="PostCategory">
        <Link to='/'>Home</Link>
        <div>Post Category</div>
      </div>
    );
  }
}

export default PostCategory;
