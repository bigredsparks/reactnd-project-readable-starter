import React, { Component } from 'react'
import Modal from 'react-modal'
import { Container, Col, Row, Button, Input } from 'mdbreact'
import { capitalize } from '../utils/stringUtils'
import { connect } from 'react-redux'
//import { createPost, modifyPost } from '../actions'
import * as actions from '../actions'
import * as PostsApi from './PostsApi'

class AddEditPostModal extends Component {
  state = {
    creatPost: false,
    postToEdit: undefined,
    isOpen: false // keeps track of visible state of modal
  }

  openModal = () => {
    const { createPost } = this.props
    let { post } = this.props

    if ( !post ) {
      post = {
        id: Date.now(),
        timestamp: Date.now(),
        author : '',
        title: '',
        body: '',
        category: '',
        voteScore: 1,
        deleted: false,
        comments: []
      }
    }

    // show modal
    this.setState({
      createPost,
      postToEdit: post,
      isOpen: true
    })
  }

  closeModal = (confirmed) => {
    const { addPost, updatePost } = this.props
    const { createPost, postToEdit } = this.state

    if (confirmed) {
      if (createPost) {
//        addPost({newPost: postToEdit})
        PostsApi.insertPost(postToEdit).then((post) =>{
          addPost(post)
        })

      } else {
        PostsApi.updatePost(postToEdit).then((post) =>{
          updatePost(post)
        })
      }
    }

    // hide modal
    this.setState({
      isOpen: false
    })
  }

  handleAuthorChange = (event) => {
    const author = event.target.value
    const { postToEdit } = this.state
    this.setState({
      postToEdit: {
        ...postToEdit,
        author
      }
    })
  }

  handleTitleChange = (event) => {
    const title = event.target.value
    const { postToEdit } = this.state
    this.setState({
      postToEdit: {
        ...postToEdit,
        title
      }
    })
  }

  handleBodyChange = (event) => {
    const body = event.target.value
    const { postToEdit } = this.state
    this.setState({
      postToEdit: {
        ...postToEdit,
        body
      }
    })
  }

  handleCategoryChange = (event) => {
    const category = event.target.value
    const { postToEdit } = this.state
    this.setState({
      postToEdit: {
        ...postToEdit,
        category
      }
    })
  }

  render() {
    const { createPost } = this.props
    const { isOpen, postToEdit } = this.state

    return (
      <div>
        <Button color="warning" size={'sm'} onClick={this.openModal}>{createPost ? 'Create Post' : 'Edit'}</Button>
        <Modal
        isOpen={isOpen}
        onRequestClose={() => this.closeModal(false)}
        ariaHideApp={false}
        contentLabel="Edit Modal" >
        <div className='modal-header'>{createPost ? 'Create Post' : 'Edit Post'}</div>
        <div className='modal-body'>
          <Container fluid={true}>
            <Row>
              <Col md='1' >Category</Col>
              <Col md='11'>{createPost
              ? <div>
              <select
                  onChange={this.handleCategoryChange}
                  value={postToEdit ? postToEdit.category : ''}
                  >
                  <option value='' disabled>Select Category...</option>
                  <option value='react'>React</option>
                  <option value='redux'>Redux</option>
                  <option value='udacity'>Udacity</option>
                </select>
              </div>
              : postToEdit && capitalize(postToEdit.category)}</Col>
            </Row>
            <Row>
              <Col md='12'>
                <Input
                  label='Author'
                  defaultValue={postToEdit && postToEdit.author}
                  onChange={this.handleAuthorChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Input
                  label='Title'
                  defaultValue={postToEdit && postToEdit.title}
                  onChange={this.handleTitleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Input
                  label='Body'
                  type='textarea'
                  defaultValue={postToEdit && postToEdit.body}
                  onChange={this.handleBodyChange}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div className='modal-footer'>
          <Button color="success" onClick={() => this.closeModal(true)}>OK</Button>
          <Button color="danger" onClick={() => this.closeModal(false)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  )}
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(actions.createPost(data)),
    updatePost: (data) => dispatch(actions.modifyPost(data)),
  }
}

export default connect(undefined, mapDispatchToProps)(AddEditPostModal)
