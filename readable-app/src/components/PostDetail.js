import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'

class PostDetail extends Component {
  render() {
    const { category, postId, posts } = this.props
    console.log(category, postId)

    const post = posts.find((post) => post.id === postId)

    return (
      <div className="PostDetail">
        <Link to='/'>Home</Link>
        <Grid>
          <Row className='show-grid'>
            <PageHeader>Post</PageHeader>
          </Row>
          <Row className='show-grid'>
            <Col md={1} >Category</Col><Col md={11}>{capitalize(post.category)}</Col>
            <Col md={1} >Date</Col><Col md={11}>{timestampToStr(post.timestamp)}</Col>
            <Col md={1} >Author</Col><Col md={11}>{post.author}</Col>
            <Col md={1} >Title</Col><Col md={11}>{post.title}</Col>
            <Col md={12} ><Panel>
              <Panel.Body>
              {post.body}
              </Panel.Body>
            </Panel></Col>
          </Row>
          <Row className='show-grid'>
            Comments:
          </Row>
        </Grid>
      </div>
    );
  }
}

export default PostDetail;
