import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Button, Card, CardBody, CardText, CardTitle, Col, Row, Navbar, NavbarBrand, Badge } from 'mdbreact'
import { capitalize } from '../utils/stringUtils'
import { timestampToStr } from '../utils/dateUtils'
import AddEditPostModal from './AddEditPostModal'
import DeleteModal from './DeleteModal'
import sortBy from 'sort-by'
import * as actions from '../actions'
import * as PostsApi from './PostsApi'

class ListPosts extends Component {
  state = {
    sortKey: 'timestamp',
  }

  componentDidMount() {
    this.fetchPosts()
  }

  componentDidUpdate(prevProps) {
    const {category} = this.state

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

  onCloseDeleteModal = (confirmed, id) => {
    if (confirmed) {
      PostsApi.deletePostById(id).then((post) => {
        this.props.deletePost(post)
      })
    }
  }

  onVoteForPost = (postId, vote) => {
    PostsApi.votePost(postId, vote).then((post) => {
      this.props.voteForPost(post)
    })
  }

  onSortBy = (event) => {
    const sortKey = event.target.value
    this.setState({
      sortKey
    })
  }

  onCategoryChange = (event) => {
    const category = event.target.value
    this.props.history.push('/' + category)
  }

  render() {
    const { posts, category, categories } = this.props
    const { sortKey } = this.state

    // show only posts that are not deleted
    let shownPosts = posts.filter((post) => !post.deleted)
    shownPosts && shownPosts.sort(sortBy(sortKey))

    return (
      <div>
        <Container fluid={true} >
          <Navbar color="indigo" dark expand="md" scrolling>
            <NavbarBrand href="/">Readable</NavbarBrand>
          </Navbar>
        </Container>
        <Container fluid={true} >
          <Row>
            <div className="categorySelector" >
              Categories: <select
                onChange={this.onCategoryChange}
                value={category || ''}
                >
                <option value=''>All</option>
                {categories.map((category) => (
                  <option value={category.path}>{category.name}</option>
                ))}
                </select>
            </div>
            <div className="sortSelector" >
              Sort by: <select
                  onChange={this.onSortBy}
                  value={sortKey || '+timestamp'}
                >
                <option value='timestamp'>Oldest</option>
                <option value='-timestamp'>Newest</option>
                <option value='-voteScore'>Highest Vote</option>
                <option value='voteScore'>Lowest Vote</option>
              </select>
            </div>
            <AddEditPostModal createPost={true} />
          </Row>
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
                    <Badge className='voter' color='success' pill onClick={() => this.onVoteForPost(post.id, true)}>+</Badge>&nbsp;
                    <Badge className='voter' color='danger' pill onClick={() => this.onVoteForPost(post.id,false)}>-</Badge>
                  </Col>
                  <Col md='8'>
                    <Row>
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

function mapStateToProps({posts, categories}) {
  return {
    posts,
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteForPost: (data) => dispatch(actions.votePost(data)),
    deletePost: (data) => dispatch(actions.removePost(data)),
    getPosts:(data) => dispatch(actions.getPosts(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))
