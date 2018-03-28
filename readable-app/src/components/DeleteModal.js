import React, { Component } from 'react'
import { Button } from 'mdbreact'
import Modal from 'react-modal'

class DeleteModal extends Component {
  state = {
    isOpen: false // keeps track of visible state of modal
  }

  openModal = () => {
    // show modal
    this.setState({
      isOpen: true
    })
  }

  closeModal = (confirm) => {
    // call close callback on parent
    const { onClose, id } = this.props
    onClose && onClose(confirm, id)

    // hide model
    this.setState({
      isOpen: false
    })
  }

  render() {
    const { isOpen } = this.state

    return (
      <div  >
        <Button color="danger" size={'sm'} onClick={this.openModal}>Delete</Button>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => this.closeModal(false)}
          ariaHideApp={false}
          contentLabel="Delete Modal" >
          <div className='modal-header'>Confirm Delete</div>
          <div className='modal-body'>Are you sure?</div>
          <div className='modal-footer'>
            <Button color="success" onClick={() => this.closeModal(true)}>Yes</Button>
            <Button color="danger" onClick={() => this.closeModal(false)}>No</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal
