import React, { Component } from 'react'
import Modal from 'react-modal'
import { Container, Col, Row, Button, Input } from 'mdbreact'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as PostsApi from '../PostsApi'

class AddEditCommentModal extends Component {
  state = {
    createComment: false,
    commentToEdit: undefined,
    isOpen: false, // keeps track of visible state of modal
    errorMsg: ''
  }

  onOpenModal = () => {
    const { createComment, postId } = this.props
    let { comment } = this.props

    if ( !comment ) {
      comment = {
        id: Date.now(),
        timestamp: Date.now(),
        author : '',
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

  onCloseModal = (confirmed) => {
    const { addComment, updateComment } = this.props
    const { createComment, commentToEdit } = this.state

    if (confirmed) {
      if (!this.validInput(commentToEdit)) {
        return
      }
      if (createComment) {
        // create new comment
        PostsApi.insertComment(commentToEdit).then((comment) =>{
          addComment(comment)
        })

      } else {
        // update comment
        commentToEdit.timestamp = Date.now()
        PostsApi.updateComment(commentToEdit).then((comment) =>{
          updateComment(comment)
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
    if (post.author.trim() === '') {
      errorMsg = 'Please enter an Author.'
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
    const { commentToEdit } = this.state
    this.setState({
      commentToEdit: {
        ...commentToEdit,
        author
      }
    })
  }

  onBodyChange = (event) => {
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
    const { isOpen, commentToEdit, errorMsg } = this.state

    return (
      <div>
        <Button color={createComment ? 'success' : 'warning'} size={'sm'} onClick={this.onOpenModal}>{createComment ? 'Add Comment' : 'Edit'}</Button>
        <Modal
        isOpen={isOpen}
        onRequestClose={() => this.onCloseModal(false)}
        ariaHideApp={false}
        contentLabel="Edit Modal" >
        <div className='modal-header'>{createComment ? 'Create Comment' : 'Edit Comment'}</div>
        <div className='modal-body'>
          <Container fluid={true}>
            <Row>
              {createComment
              ?<Col md='12'>
                <Input
                    label='Author'
                    defaultValue={commentToEdit && commentToEdit.author}
                    onChange={this.onAuthorChange}
                  />
              </Col>
              :<Col md='12' >Author: {commentToEdit && commentToEdit.author}</Col>}

            </Row>
            <Row>
              <Col md='12'>
                <Input
                  label='Message'
                  type='textarea'
                  defaultValue={commentToEdit && commentToEdit.body}
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

function mapDispatchToProps(dispatch) {
  return {
    addComment: (data) => dispatch(actions.createComment(data)),
    updateComment: (data) => dispatch(actions.modifyComment(data)),
  }
}

export default connect(undefined, mapDispatchToProps)(AddEditCommentModal)
