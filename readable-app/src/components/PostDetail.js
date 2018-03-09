import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
//import { Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap'
import { Container, Col, Row, Button, Navbar, NavbarBrand, NavbarToggler, NavbarNav, NavItem, NavLink, Input } from 'mdbreact'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { removePost, modifyPost } from '../actions'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'

class PostDetail extends Component {
  state = {
    redirect: false,
    deleteModalOpen: false,
    postIdToDelete: undefined,

    editModalOpen: false,
    postToEdit: undefined,
  }

  openEditModal = (post) => {
    this.setState((state) =>({
      ...state,
      editModalOpen: true,
      postToEdit: post,
    }))
  }

  closeEditModal = (confirmed) => {
    console.log(this.input)
    const { updatePost } = this.props

    const editModalOpen = false;
    if (confirmed) {
      // todo validate
      updatePost({modifiedPost: this.state.postToEdit})
    }

    this.setState((state) =>({
      ...state,
      editModalOpen,
      postToEdit: undefined,
    }))

  }

  openDeleteModal = (post) => {
    this.setState((state) =>({
      ...state,
      deleteModalOpen: true,
      postIdToDelete: post.id,
    }))
  }

  closeDeleteModal = (confirmed) => {
    const { postIdToDelete } = this.state
    const { deletePost } = this.props

    this.setState((state) =>({
      ...state,
      redirect: confirmed ? true : false,
      deleteModalOpen: false,
      postIdToDelete: undefined,
    }))

    if (confirmed) {
      deletePost({postId: postIdToDelete})
    }
  }

  handleAuthorChange = (event) => {
    const author = event.target.value
    this.setState((state) => ({
      ...state,
      postToEdit: {
        ...state.postToEdit,
        author
      }
    }))
  }

  handleTitleChange = (event) => {
    const title = event.target.value
    this.setState((state) => ({
      ...state,
      postToEdit: {
        ...state.postToEdit,
        title
      }
    }))
  }

  render() {
    const { category, postId, posts } = this.props
    // TODO
//    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const from = { pathname: "/" }

    console.log("props", this.props)
    const { redirect } = this.state

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
          <Button color="warning" size={'sm'} onClick={() => this.openEditModal(post)}>Edit</Button>
          <Button color="danger" size={'sm'} onClick={() => this.openDeleteModal(post)}>Delete</Button>
        </Row>

        <Row>
          Comments ({post.comments.length})
        </Row>
        <Row>
          <Button color="primary" size={'sm'} >Add Comment</Button>
        </Row>
      </Container>

      <Modal
        isOpen={this.state.deleteModalOpen}
        onRequestClose={this.closeDeleteModal}
        ariaHideApp={false}
        contentLabel="Delete Modal" >
        <div className='modal-header'>Confirm Delete</div>
        <div className='modal-body'>Are you sure?</div>
        <div className='modal-footer'>
          <Button color="success" onClick={() => this.closeDeleteModal(true)}>Yes</Button>
          <Button color="danger" onClick={() => this.closeDeleteModal(false)}>No</Button>
        </div>
      </Modal>

      <Modal
        isOpen={this.state.editModalOpen}
        onRequestClose={this.closeEditModal}
        ariaHideApp={false}
        contentLabel="Edit Modal" >
        <div className='modal-header'>Edit Post</div>
        <div className='modal-body'>
        <Container fluid={true}>
          <Row>
            <Col md='1' >Category</Col>
            <Col md='11'>{capitalize(post.category)}</Col>
          </Row>
          <Row>
            <Col md='12'>
              <Input
                label='Author'
                defaultValue={post.author}
                onChange={this.handleAuthorChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <Input
                label='Title'
                defaultValue={post.title}
                onChange={this.handleTitleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <Input
                type='textarea'
                defaultValue={post.body}
              />
            </Col>
          </Row>
      </Container>

        </div>
        <div className='modal-footer'>
          <Button color="success" onClick={() => this.closeEditModal(true)}>OK</Button>
          <Button color="danger" onClick={() => this.closeEditModal(false)}>Cancel</Button>
        </div>
      </Modal>

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
    deletePost: (data) => dispatch(removePost(data)),
    updatePost: (data) => dispatch(modifyPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
