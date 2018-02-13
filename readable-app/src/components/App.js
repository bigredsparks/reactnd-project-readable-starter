import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PostCategory from './PostCategory'
import PostDetail from './PostDetail'
import PostEdit from './PostEdit'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() =>(
          <div>
            Readable main
          </div>
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
