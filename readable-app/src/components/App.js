import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListPosts from './ListPosts'
import PostCategory from './PostCategory'
import PostDetail from './PostDetail'

class App extends Component {
  state = {
    categories: [
      'react',
      'redux',
      'udacity'
    ],
    posts: [
      {
        id: '1',
        timestamp: Date.now(),
        title: 'Title 1',
        body: 'Body 1',
        author: 'Author Name',
        category: 'react',
        voteScore: 1,
        deleted: false
      },
      {
        id: '2',
        timestamp: Date.now(),
        title: 'Title 2',
        body: 'Body 2',
        author: 'Author Name',
        category: 'redux',
        voteScore: 1,
        deleted: false
      },
      {
        id: '3',
        timestamp: Date.now(),
        title: 'Title 3',
        body: 'Body 3',
        author: 'Author Name',
        category: 'udacity',
        voteScore: 1,
        deleted: false
      },
    ]
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
          <PostCategory
            category={match.params.category}
            posts={posts}
          />
        )}/>
        <Route exact path={detailPath} render={({history, match}) =>(
          <PostDetail
            category={match.params.category}
            postId={match.params.post_id}
          />
        )}/>
      </div>
    );
  }
}

export default App;
