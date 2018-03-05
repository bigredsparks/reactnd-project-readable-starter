import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import { Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap'
import { Container, Col, Row, Button, Navbar, NavbarBrand, NavbarToggler, NavbarNav, NavItem, NavLink } from 'mdbreact'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'

class PostDetail extends Component {
  render() {
    const { category, postId, posts } = this.props
    console.log(category, postId)

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

          <Col md='1' >Title</Col>
          <Col md='11'>{post.title}</Col>

          <Col md='12' ><p>{post.body}</p></Col>
          <Button color="warning" size={'sm'} >Edit</Button>
          <Button color="danger" size={'sm'} >Delete</Button>
        </Row>

        <Row>
          Comments:
        </Row>
        <Row>
          <Button color="primary" size={'sm'} >Add Comment</Button>
        </Row>
      </Container>
    </div>
    );
  }
}

export default PostDetail;
