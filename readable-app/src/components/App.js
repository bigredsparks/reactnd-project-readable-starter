import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import ListPosts from './ListPosts'
import PostDetail from './PostDetail'
import * as actions from '../actions'
import * as PostsApi from './PostsApi'

class App extends Component {
  componentDidMount() {
    PostsApi.getCategories().then((categories) => {
      this.props.getCategories(categories)
    })
  }

  render() {
    const { categories } = this.props
    if (categories.length === 0) {
      return (<div></div>)
    }
    const paths = categories.map((category) => (category.path))
    const categoryPath = `/:category(${paths.join('|')})`
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
            history={history}
          />
        )}/>
      </div>
    );
  }
}

function mapStateToProps({categories}) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories:(data) => dispatch(actions.getCategories(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
