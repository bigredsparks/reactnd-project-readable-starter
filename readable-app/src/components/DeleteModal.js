import React, { Component } from 'react'
import { Button } from 'mdbreact'
import Modal from 'react-modal'

class DeleteModal extends Component {
  // componentDidMount = () => {
  //   console.log('componentDidMount', this.props)
  // }

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log('shouldComponentUpdate', nextProps, nextState)
  //   return true
  // }

  render() {
    console.log('render', this.props)
    const {isModalOpen, closeModal} = this.props

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={this.closeModal}
        ariaHideApp={false}
        contentLabel="Delete Modal" >
        <div className='modal-header'>Confirm Delete</div>
        <div className='modal-body'>Are you sure?</div>
        <div className='modal-footer'>
          <Button color="success" onClick={() => closeModal(true)}>Yes</Button>
          <Button color="danger" onClick={() => closeModal(false)}>No</Button>
        </div>
      </Modal>
    );
  }
}

export default DeleteModal
