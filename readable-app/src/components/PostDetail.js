import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostDetail extends Component {
  render() {
    return (
      <div className="PostDetail">
        <Link to='/'>Home</Link>
        <div>Post Detail</div>
      </div>
    );
  }
}

export default PostDetail;
