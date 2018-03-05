import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListPosts from './ListPosts'
import PostCategory from './PostCategory'
import PostDetail from './PostDetail'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/css/bootstrap-theme.css'
//import 'startbootstrap-freelancer/css/freelancer.css'

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
        timestamp: 1518727586111,
        title: 'Title 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Vince Sparks',
        category: 'react',
        voteScore: 1,
        deleted: false
      },
      {
        id: '2',
        timestamp: 1518727603372,
        title: 'Title 2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Brad Rosse',
        category: 'redux',
        voteScore: 1,
        deleted: false
      },
      {
        id: '3',
        timestamp: 1518727613372,
        title: 'Title 3',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Nick Wignall',
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
