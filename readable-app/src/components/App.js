import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ListPosts from './ListPosts'
import PostDetail from './PostDetail'
// import { initPosts, initComments } from '../actions'
//import * as PostsApi from './PostsApi'

class App extends Component {
  state = {
    categories: [
      'react',
      'redux',
      'udacity'
    ],
  }

  // componentDidMount() {
  //   const {initializePosts, initializeComments } = this.props
  //   PostsApi.getPosts().then((posts) => {
  //     initializePosts(posts)

  //     posts.forEach((post) => {
  //       PostsApi.getPostComments(post.id).then((comments) => {
  //         initializeComments(comments)
  //       })
  //     })
  //   })
  // }


  render() {
    const { categories } = this.state

    const categoryPath = `/:category(${categories.join('|')})`
    const detailPath = categoryPath + '/:post_id'

    return (
      <div className="App">
        <Route exact path='/' render={({history}) =>(
          <ListPosts
            categories={categories}
            history={history}
          />
        )}/>
        <Route exact path={categoryPath} render={({history, match}) =>(
          <ListPosts
            category={match.params.category}
            categories={categories}
            history={history}
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

// function mapDispatchToProps(dispatch) {
//   return {
//     initializePosts: (data) => dispatch(initPosts(data)),
//     initializeComments: (data) => dispatch(initComments(data)),
//   }
// }

export default App //connect(undefined, mapDispatchToProps)(App)
