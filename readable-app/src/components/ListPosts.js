import React, { Component } from 'react';

class ListPosts extends Component {
  render() {
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
              <li>Post 1</li>
              <li>Post 2</li>
              <li>Post 3</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ListPosts;
