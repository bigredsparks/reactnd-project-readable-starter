import React, { Component } from 'react'
import { Container, Col, Row, Navbar, NavbarBrand } from 'mdbreact'

class NotFound extends Component {
  render() {
    return (
      <div>
        <Container fluid={true} >
          <Navbar color="indigo" dark expand="md" scrolling>
            <NavbarBrand href="/">Readable</NavbarBrand>
          </Navbar>
        </Container>
        <Container>
        <Row>
          <Col md='12' ><h2>Page Not Found</h2></Col>
        </Row>
        </Container>
      </div>
    )}
}

export default NotFound
