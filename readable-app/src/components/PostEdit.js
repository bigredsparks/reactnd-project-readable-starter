import React, { Component } from 'react'
import Modal from 'react-modal'
import { Container, Col, Row, Button, Input } from 'mdbreact'
import { capitalize } from '../utils/stringUtils'

class PostEdit extends Component {
  state = {
    postToEdit: undefined,
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


  onCloseModal = (confirmed) => {
    const { closeModal } = this.props
    const { postToEdit } = this.state

    // todo validate input

    closeModal(confirmed
      ? postToEdit
      : undefined
    )
  }

  componentDidMount() {
    const { post } = this.props
    this.setState({
      postToEdit: post
    })
  }

  render() {
    const { post, isModalOpen } = this.props

    return (
      <Modal
      isOpen={isModalOpen}
      onRequestClose={this.closeModal}
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
                onChange={this.onAuthorChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <Input
                label='Title'
                defaultValue={post.title}
                onChange={this.onTitleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <Input
                type='textarea'
                defaultValue={post.body}
                onChange={this.onBodyChange}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className='modal-footer'>
        <Button color="success" onClick={() => this.onCloseModal(true)}>OK</Button>
        <Button color="danger" onClick={() => this.onCloseModal(false)}>Cancel</Button>
      </div>
    </Modal>
  )}
}

export default PostEdit
