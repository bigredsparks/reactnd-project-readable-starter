import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Container, Col, Row, Button, Navbar, NavbarBrand, NavbarToggler, NavbarNav, NavItem, NavLink, } from 'mdbreact'
import { connect } from 'react-redux'
import DeleteModal from './DeleteModal'
import AddEditPostModal from './AddEditPostModal'
import { removePost } from '../actions'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'

class PostDetail extends Component {
  state = {
    redirect: false,
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

  render() {
    const { postId, posts } = this.props
    const { redirect } = this.state
    // TODO
//    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const from = { pathname: "/" }

    console.log("props", this.props)

    if (redirect) {
      return <Redirect to={from} />
    }

    const post = posts.find((post) => post.id === postId)

    return (
      <div>
      <Container fluid={true}>
        <Navbar color="indigo" dark expand="md" fixed="top" scrolling>
          <NavbarBrand href="/">Readable</NavbarBrand>
          <NavbarToggler />
          <div className="collapse navbar-collapse" id="reactNavbar">
            <NavbarNav className="ml-auto">
              <NavItem>
                <NavLink className="nav-link" to="/">Home</NavLink>
              </NavItem>
            </NavbarNav>
          </div>
        </Navbar>
      </Container>

      <Container>
        <Link to='/'>Home</Link>
        <Row>
          Post
        </Row>
        <Row>
          <Col md='1' >Category</Col>
          <Col md='11'>{capitalize(post.category)}</Col>

          <Col md='1' >Date</Col>
          <Col md='11'>{timestampToStr(post.timestamp)}</Col>

          <Col md='1' >Author</Col>
          <Col md='11'>{post.author}</Col>

          <Col md='1' >Votes</Col>
          <Col md='11'>{post.voteScore}</Col>

          <Col md='1' >Title</Col>
          <Col md='11'>{post.title}</Col>

          <Col md='12' ><p>{post.body}</p></Col>
          <AddEditPostModal
            post={post}
          />
          <DeleteModal
            onClose={this.onCloseDeleteModal}
            postId={postId} />
        </Row>

        <Row>
          Comments ({post.comments.length})
        </Row>
        <Row>
          <Button color="primary" size={'sm'} >Add Comment</Button>
        </Row>

      </Container>
    </div>
    );
  }
}

function mapStateToProps(posts) {
//  console.log("ownprops", ownProps)
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: (data) => dispatch(removePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
