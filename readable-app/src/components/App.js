import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListPosts from './ListPosts'
import PostCategory from './PostCategory'
import PostDetail from './PostDetail'
import PostEdit from './PostEdit'

class App extends Component {
  state = {
    posts: [
      {
        id: '1',
        timestamp: Date.now(),
        title: 'Title 1',
        body: 'Body 1',
        author: 'Author Name',
        category: 'React',
        voteScore: 1,
        deleted: false
      },
      {
        id: '2',
        timestamp: Date.now(),
        title: 'Title 2',
        body: 'Body 2',
        author: 'Author Name',
        category: 'Redux',
        voteScore: 1,
        deleted: false
      },
      {
        id: '3',
        timestamp: Date.now(),
        title: 'Title 3',
        body: 'Body 3',
        author: 'Author Name',
        category: 'Udacity',
        voteScore: 1,
        deleted: false
      },
    ]
  }

  render() {
    const { posts } = this.state

    return (
      <div className="App">
        <Route exact path='/' render={() =>(
          <ListPosts posts={posts}
          />
        )}/>
        <Route path='/category' render={({history}) =>(
          <PostCategory
          />
        )}/>
        <Route path='/detail' render={({history}) =>(
          <PostDetail
          />
        )}/>
        <Route path='/edit' render={({history}) =>(
          <PostEdit
          />
        )}/>
      </div>
    );
  }
}

export default App;
