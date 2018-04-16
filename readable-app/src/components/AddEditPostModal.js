import React, { Component } from 'react'
import Modal from 'react-modal'
import { Container, Col, Row, Button, Input } from 'mdbreact'
import { capitalize } from '../utils/stringUtils'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as PostsApi from './PostsApi'

class AddEditPostModal extends Component {
  state = {
    creatPost: false,
    postToEdit: undefined,
    isOpen: false, // keeps track of visible state of modal
    errorMsg: ''
  }

  onOpenModal = () => {
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

  onCloseModal = (confirmed) => {
    const { addPost, updatePost } = this.props
    const { createPost, postToEdit } = this.state

    if (confirmed) {
      if (!this.validInput(postToEdit)) {
        return
      }

      if (createPost) {
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

  validInput = (post) => {
    let errorMsg = ''
    if (post.category.trim() === '') {
      errorMsg = 'Please select a Category.'
    }
    else if (post.author.trim() === '') {
      errorMsg = 'Please enter an Author.'
    }
    else if (post.title.trim() === '') {
      errorMsg = 'Please enter a Title.'
    }
    else if (post.body.trim() === '') {
      errorMsg = 'Please enter a Message.'
    }

    this.setState({
      errorMsg
    })

    return errorMsg === ''
  }

  onAuthorChange = (event) => {
    const author = event.target.value
    const { postToEdit } = this.state
    this.setState({
      postToEdit: {
        ...postToEdit,
        author
      }
    })
  }

  onTitleChange = (event) => {
    const title = event.target.value
    const { postToEdit } = this.state
    this.setState({
      postToEdit: {
        ...postToEdit,
        title
      }
    })
  }

  onBodyChange = (event) => {
    const body = event.target.value
    const { postToEdit } = this.state
    this.setState({
      postToEdit: {
        ...postToEdit,
        body
      }
    })
  }

  onCategoryChange = (event) => {
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
    const { createPost, categories } = this.props
    const { isOpen, postToEdit, errorMsg } = this.state

    return (
      <div>
        <Button color="warning" size={'sm'} onClick={this.onOpenModal}>{createPost ? 'Create Post' : 'Edit'}</Button>
        <Modal
        isOpen={isOpen}
        onRequestClose={() => this.onCloseModal(false)}
        ariaHideApp={false}
        contentLabel="Edit Modal" >
        <div className='modal-header'>{createPost ? 'Create Post' : 'Edit Post'}</div>
        <div className='modal-body'>
          <Container fluid={true}>
            <Row>
              <Col md='1' >Category:</Col>
              <Col md='11'>{createPost
                ? <div>
                <select
                    onChange={this.onCategoryChange}
                    value={postToEdit ? postToEdit.category : ''}
                    >
                    <option value='' disabled>Select Category...</option>
                    {categories.map((category) =>(
                      <option key={category.path} value={category.path}>{category.name}</option>
                    ))}
                  </select>
                </div>
                : postToEdit && capitalize(postToEdit.category)}
              </Col>
            </Row>
            <Row>
            {createPost
              ?<Col md='12'>
                <Input
                    label='Author'
                    defaultValue={postToEdit && postToEdit.author}
                    onChange={this.onAuthorChange}
                  />
              </Col>
              :<Col md='12' >Author: {postToEdit && postToEdit.author}</Col>}
            </Row>
            <Row>
              <Col md='12'>
                <Input
                  label='Title'
                  defaultValue={postToEdit && postToEdit.title}
                  onChange={this.onTitleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Input
                  label='Message'
                  type='textarea'
                  defaultValue={postToEdit && postToEdit.body}
                  onChange={this.onBodyChange}
                />
              </Col>
            </Row>
            <Row>
              <div className="errorMsg">{errorMsg}</div>
            </Row>
          </Container>
        </div>
        <div className='modal-footer'>
          <Button color="success" onClick={() => this.onCloseModal(true)}>OK</Button>
          <Button color="danger" onClick={() => this.onCloseModal(false)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  )}
}

function mapStateToProps({categories}) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(actions.createPost(data)),
    updatePost: (data) => dispatch(actions.modifyPost(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPostModal)
