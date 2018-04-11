import React, { Component } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Button, Card, CardBody, CardText, CardTitle, Col, Row, Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, Badge } from 'mdbreact'
import { capitalize } from '../utils/stringUtils'
import { timestampToStr } from '../utils/dateUtils'
import AddEditPostModal from './AddEditPostModal'
import DeleteModal from './DeleteModal'
import sortBy from 'sort-by'
//import { votePost, removePost, initPosts, initComments } from '../actions'
import * as actions from '../actions'
import * as PostsApi from './PostsApi'

class ListPosts extends Component {
  state = {
    sortKey: 'timestamp',
    category: ''
  }

  componentDidMount() {
    this.fetchPosts()
  }

  componentDidUpdate(prevProps) {
     if(prevProps.category !== this.props.category) {
       this.fetchPosts()
     }
  }

  fetchPosts = () => {
    const {getPosts, category} = this.props

    if (category) {
      PostsApi.getPostsByCategory(category).then((posts) => {
        getPosts(posts)
      })
    }
    else {
      PostsApi.getPosts().then((posts) => {
        getPosts(posts)
      })
    }
  }

  onCloseDeleteModal = (confirmed, postId) => {
    if (confirmed) {
      const { deletePost } = this.props
      PostsApi.deletePostById(postId).then(() => {
        deletePost({postId})
      })
    }
  }

  sortBy = (event) => {
    const sortKey = event.target.value
    this.setState({
      sortKey
    })
  }

  handleCategoryChange = (event) => {
    const { history } = this.props
    const category = event.target.value
    this.setState({
      category
    })
    history.push('/' + category)
  }

  render() {
    const { posts, category, voteForPost } = this.props
    const { sortKey, redirect } = this.state
    let shownPosts = posts

    // if category is defined only show posts for category
    //category && (shownPosts = shownPosts.filter((post) => post.category === category))

    // show only posts that are not deleted
    shownPosts = shownPosts.filter((post) => !post.deleted)
    shownPosts && shownPosts.sort(sortBy(sortKey))

    return (
      <div>
        <Container fluid={true} >
          <Navbar color="indigo" dark expand="md" scrolling>
            <NavbarBrand href="/">Readable</NavbarBrand>
            {/* <div className="collapse navbar-collapse" id="reactNavbar">
              <NavbarNav className="ml-auto">
                <NavItem>
                  <NavLink className="nav-link" to="/">Categories</NavLink>
                </NavItem>
              </NavbarNav>
            </div> */}
          </Navbar>
        </Container>
        <Container fluid={true} >
          <div>
            Categories: <select
                onChange={this.handleCategoryChange}
                value={category || ''}
                >
                <option value=''>All</option>
                <option value='react'>React</option>
                <option value='redux'>Redux</option>
                <option value='udacity'>Udacity</option>
            </select>

            {' '}Sort by: <select
                  onChange={this.sortBy}
                  value={sortKey || '+timestamp'}
                >
                <option value='timestamp'>Oldest</option>
                <option value='-timestamp'>Newest</option>
                <option value='-voteScore'>Highest Vote</option>
                <option value='voteScore'>Lowest Vote</option>
            </select>
            <AddEditPostModal createPost={true} />
          </div>
          {shownPosts && shownPosts.map((post) => (
            <Card key={post.id} >
              <CardBody>
                <CardTitle>
                  {post.author} - {timestampToStr(post.timestamp)}
                </CardTitle>
                <CardText>
                  {capitalize(post.category)} - {post.title} - {post.body}

                </CardText>
                <Container fluid={true} >
                <Row>
                  <Col md='4'>
                    <span>Comments: {post.commentCount}&nbsp;</span>
                    <span>Votes: {post.voteScore}&nbsp;</span>
                    <Badge className='voter' color='success' pill onClick={() => voteForPost({postId: post.id, upVote: true})}>+</Badge>&nbsp;
                    <Badge className='voter' color='danger' pill onClick={() => voteForPost({postId: post.id, upVote: false})}>-</Badge>
                  </Col>
                  <Col md='8'>
                    <Row>
                  {/* <Button className='badge badge-pill' size={'sm'} color='primary' onClick={() => voteForPost({postId: post.id, upVote: true})} >+</Button>
                  <Button className='badge badge-pill' size={'sm'} color='primary' onClick={() => voteForPost({postId: post.id, upVote: false})} >-</Button> */}
                    <Button size={'sm'} color='primary' href={`/${post.category}/${post.id}`} >View</Button>
                    <AddEditPostModal
                      post={post}
                    />
                  <DeleteModal
                    onClose={this.onCloseDeleteModal}
                    id={post.id} />
                    </Row>
                  </Col>
                </Row>
                </Container>
              </CardBody>

            </Card>
          ))}

        </Container>
      </div>
    )
  }
}

function mapStateToProps({posts}) {
//  console.log("ListPosts.posts", posts)
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // voteForPost: (data) => dispatch(votePost(data)),
    deletePost: (data) => dispatch(actions.removePost(data)),
    // initializePosts: (data) => dispatch(initPosts(data)),
    // initializeComments: (data) => dispatch(initComments(data)),
    getPosts:(data) => dispatch(actions.getPosts(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))
