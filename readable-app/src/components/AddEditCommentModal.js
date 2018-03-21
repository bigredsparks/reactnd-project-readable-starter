import React, { Component } from 'react'
import Modal from 'react-modal'
import { Container, Col, Row, Button, Input } from 'mdbreact'
import { capitalize } from '../utils/stringUtils'
import { connect } from 'react-redux'
import { createComment, modifyComment } from '../actions'

class AddEditCommentModal extends Component {
  state = {
    createComment: false,
    commentToEdit: undefined,
    isOpen: false // keeps track of visible state of modal
  }

  openModal = () => {
    const { createComment, postId } = this.props
    let { comment } = this.props

    if ( !comment ) {
      comment = {
        id: Date.now(),
        timestamp: Date.now(),
        author : '',
        title: '',
        body: '',
        category: '',
        voteScore: 1,
        deleted: false,
        parentId: postId,
      }
    }

    // show modal
    this.setState({
      createComment,
      commentToEdit: comment,
      isOpen: true
    })
  }

  closeModal = (confirmed) => {
    const { addComment, updateComment } = this.props
    const { createComment, commentToEdit } = this.state

    if (confirmed) {
      if (createComment) {
        addComment({newComment: commentToEdit})
      } else {
        updateComment({modifiedComment: commentToEdit})
      }
    }

    // hide modal
    this.setState({
      isOpen: false
    })
  }

  handleAuthorChange = (event) => {
    const author = event.target.value
    const { commentToEdit } = this.state
    this.setState({
      commentToEdit: {
        ...commentToEdit,
        author
      }
    })
  }

  handleTitleChange = (event) => {
    const title = event.target.value
    const { commentToEdit } = this.state
    this.setState({
      commentToEdit: {
        ...commentToEdit,
        title
      }
    })
  }

  handleBodyChange = (event) => {
    const body = event.target.value
    const { commentToEdit } = this.state
    this.setState({
      commentToEdit: {
        ...commentToEdit,
        body
      }
    })
  }

  render() {
    const { createComment } = this.props
    const { isOpen, commentToEdit } = this.state

    return (
      <div>
        <Button color="primary" size={'sm'} onClick={this.openModal}>{createComment ? 'Add Comment' : 'Edit'}</Button>
        <Modal
        isOpen={isOpen}
        onRequestClose={() => this.closeModal(false)}
        ariaHideApp={false}
        contentLabel="Edit Modal" >
        <div className='modal-header'>{createComment ? 'Create Comment' : 'Edit Comment'}</div>
        <div className='modal-body'>
          <Container fluid={true}>
            {/* <Row>
              <Col md='1' >Category</Col>
              <Col md='11'>{createComment
              ? <div>TODO</div>
              : postToEdit && capitalize(postToEdit.category)}</Col>
            </Row> */}
            <Row>
              <Col md='12'>
                <Input
                  label='Author'
                  defaultValue={commentToEdit && commentToEdit.author}
                  onChange={this.handleAuthorChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Input
                  label='Title'
                  defaultValue={commentToEdit && commentToEdit.title}
                  onChange={this.handleTitleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Input
                  label='Body'
                  type='textarea'
                  defaultValue={commentToEdit && commentToEdit.body}
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
    addComment: (data) => dispatch(createComment(data)),
    updateComment: (data) => dispatch(modifyComment(data)),
  }
}

export default connect(undefined, mapDispatchToProps)(AddEditCommentModal)
