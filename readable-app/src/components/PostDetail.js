import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import { Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap'
import { Container, Grid, Row, Col, Button, Well } from 'mdbreact'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'

class PostDetail extends Component {
  render() {
    const { category, postId, posts } = this.props
    console.log(category, postId)

    const post = posts.find((post) => post.id === postId)

    return (
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
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Row>

        <Row>
          Comments:
        </Row>
        <Row>
          <Button>Add Comment</Button>
        </Row>
      </Container>
    );
  }
}

export default PostDetail;
