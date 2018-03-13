import React, { Component } from 'react'
import Modal from 'react-modal'
import { Container, Col, Row, Button, Input } from 'mdbreact'
import { capitalize } from '../utils/stringUtils'
import { connect } from 'react-redux'
import { modifyPost } from '../actions'

class AddEditPostModal extends Component {
  state = {
    postToEdit: undefined,
    isOpen: false // keeps track of visible state of modal
  }

  openModal = () => {
    const { post } = this.props

    // show modal
    this.setState({
      postToEdit: post,
      isOpen: true
    })
  }

  closeModal = (confirmed) => {
    const { updatePost } = this.props
    const { postToEdit } = this.state

    if (confirmed) {
      updatePost({modifiedPost: postToEdit})
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

  // componentDidMount() {
  //   const { post } = this.props
  //   this.setState({
  //     postToEdit: post
  //   })
  // }

  render() {
    const { post } = this.props
    const { isOpen } = this.state

    const title = post
      ? 'Edit Post'
      : 'Add Post'

    return (
      <div>
        <Button color="warning" size={'sm'} onClick={this.openModal}>Edit</Button>
        <Modal
        isOpen={isOpen}
        onRequestClose={() => this.closeModal(false)}
        ariaHideApp={false}
        contentLabel="Edit Modal" >
        <div className='modal-header'>{title}</div>
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
    updatePost: (data) => dispatch(modifyPost(data))
  }
}

export default connect(undefined, mapDispatchToProps)(AddEditPostModal)
