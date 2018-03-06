import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListPosts from './ListPosts'
import PostDetail from './PostDetail'

class App extends Component {
  state = {
    categories: [
      'react',
      'redux',
      'udacity'
    ],
  }

  render() {
    const { posts, categories } = this.state

    const categoryPath = `/:category(${categories.join('|')})`
    const detailPath = categoryPath + '/:post_id'

    return (
      <div className="App">
        <Route exact path='/' render={() =>(
          <ListPosts
            posts={posts}
            categories={categories}
          />
        )}/>
        <Route exact path={categoryPath} render={({history, match}) =>(
          <ListPosts
            category={match.params.category}
            categories={categories}
            posts={posts}
          />
        )}/>
        <Route exact path={detailPath} render={({history, match}) =>(
          <PostDetail
            category={match.params.category}
            postId={match.params.post_id}
            posts={posts}
          />
        )}/>
      </div>
    );
  }
}

export default App;
