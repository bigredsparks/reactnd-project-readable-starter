import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Card, CardBody, CardText, CardTitle, Col, Row, Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, Badge } from 'mdbreact'
import { timestampToStr } from '../utils/dateUtils'
//import SortHeader from './SortHeader'
//import SelectCategory from './SelectCategory'
import AddEditPostModal from './AddEditPostModal'
import DeleteModal from './DeleteModal'
import sortBy from 'sort-by'
import { votePost, removePost } from '../actions'

class ListPosts extends Component {
  state = {
    sortColumn: 'timestamp',
    sortOrder: '',
  }

  onCloseDeleteModal = (confirmed, postId) => {
    this.setState({
      redirect: confirmed,
    })

    if (confirmed) {
      const { deletePost } = this.props
      deletePost({postId})
    }
  }

  sortBy = (column) => {
    // only one column can be sorted at any one time
    this.setState((state) => ({
      sortColumn: column,
      sortOrder: state.sortOrder === '' ? '-' : ''
    }))
  }

  render() {
    const { posts, category, voteForPost } = this.props
    const { sortColumn, sortOrder } = this.state
    let shownPosts = posts

    category && (shownPosts = shownPosts.filter((post) => post.category === category))
    shownPosts && shownPosts.sort(sortBy(sortOrder + sortColumn))

    return (
      <div>
        <Container fluid={true} >
          {/* <Navbar color="indigo" dark expand="md" fixed="top" scrolling> */}
          <Navbar color="indigo" dark expand="md" scrolling>
            <NavbarBrand href="/">Readable</NavbarBrand>
            <div className="collapse navbar-collapse" id="reactNavbar">
              <NavbarNav className="ml-auto">
                <NavItem>
                  <NavLink className="nav-link" to="/">Categories</NavLink>
                </NavItem>
              </NavbarNav>
            </div>
          </Navbar>
        </Container>
        <Container fluid={true} >
          <div>
            <AddEditPostModal createPost={true} />
          </div>
          {shownPosts && shownPosts.map((post) => (
            <Card key={post.id} >
              <CardBody>
                <CardTitle>
                  {post.author} - {timestampToStr(post.timestamp)}
                </CardTitle>
                <CardText>
                  {post.category} - {post.title} - {post.body}

                </CardText>
                <Container fluid={true} >
                <Row>
                  <Col md='3'>
                  <span>Comments: {post.comments.length}&nbsp;</span>
                  <span>Votes: {post.voteScore}&nbsp;</span>
                  <Badge className='voter' color='primary' pill onClick={() => voteForPost({postId: post.id, upVote: true})}>+</Badge>&nbsp;
                  <Badge className='voter' color='primary' pill onClick={() => voteForPost({postId: post.id, upVote: false})}>-</Badge>
                  </Col>
                  <Col md='9'>
                  <Row>
                  {/* <Button className='badge badge-pill' size={'sm'} color='primary' onClick={() => voteForPost({postId: post.id, upVote: true})} >+</Button>
                  <Button className='badge badge-pill' size={'sm'} color='primary' onClick={() => voteForPost({postId: post.id, upVote: false})} >-</Button> */}
                  <Button size={'sm'} color='success' href={`/${post.category}/${post.id}`} >View</Button>
                  <AddEditPostModal
                    post={post}
                  />
                  <DeleteModal
                    onClose={this.onCloseDeleteModal}
                    postId={post.id} />
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

function mapStateToProps(posts) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteForPost: (data) => dispatch(votePost(data)),
    deletePost: (data) => dispatch(removePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
