import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Container, Card, CardBody, CardText, CardTitle, Col, Row, Button, Navbar, NavbarBrand, NavbarToggler, NavbarNav, NavItem, NavLink, Badge } from 'mdbreact'
import { connect } from 'react-redux'
import DeleteModal from './DeleteModal'
import AddEditPostModal from './AddEditPostModal'
import AddEditCommentModal from './AddEditCommentModal'
import { removePost, voteComment, removeComment } from '../actions'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'

class PostDetail extends Component {
  state = {
    redirect: false,
  }

  onCloseDeleteModal = (confirmed, id) => {
    this.setState({
      redirect: confirmed,
    })

    if (confirmed) {
      const { deletePost } = this.props
      deletePost({postId: id})
    }
  }

  onCloseDeleteCommentModal = (confirmed, id) => {
    if (confirmed) {
      const { deleteComment } = this.props
      deleteComment({commentId: id})
    }
  }


  render() {
    const { postId, posts, comments, voteForComment } = this.props
    const { redirect } = this.state
    // TODO
//    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const from = { pathname: "/" }

    console.log("props", this.props)

    if (redirect) {
      return <Redirect to={from} />
    }

    const post = posts.find((post) => post.id === postId)
    const postComments = comments.filter((comment) => comment.parentId === postId && !comment.deleted)

    return (
      <div>
        <Container fluid={true} >
        <Navbar color="indigo" dark expand="md" scrolling>
          <NavbarBrand href="/">Readable</NavbarBrand>
          {/* <div className="collapse navbar-collapse" id="reactNavbar">
            <NavbarNav className="ml-auto">
              <NavItem>
                <NavLink className="nav-link" to="/">Categories</NavLink>
              </NavItem>
            </NavbarNav>
          </div> */}
        </Navbar>
      </Container>

      <Container>
        {/* <Link to='/'>Home</Link> */}
        <Row>
          <Col md='12' ><h2>Post Detail</h2></Col>
        </Row>
        <Row>
          <Col md='1' className="label" >Category</Col>
          <Col md='11'>{capitalize(post.category)}</Col>

          <Col md='1' className="label">Date</Col>
          <Col md='11'>{timestampToStr(post.timestamp)}</Col>

          <Col md='1' className="label">Author</Col>
          <Col md='11'>{post.author}</Col>

          <Col md='1' className="label">Votes</Col>
          <Col md='11'>{post.voteScore}</Col>

          <Col md='1' className="label">Title</Col>
          <Col md='11'>{post.title}</Col>

          <Col md='12' ><p>{post.body}</p></Col>
          <AddEditPostModal
            post={post}
          />
          <DeleteModal
            onClose={this.onCloseDeleteModal}
            id={postId} />
        </Row>

        <Row>
          Comments ({postComments.length})
        </Row>
        <Row>
          <AddEditCommentModal createComment={true} postId={postId} />
        </Row>
        <Row>
        <Container fluid={true} >
          {postComments.map((comment) => (
            <Card key={comment.id} >
              <CardBody>
                <CardTitle>
                  {comment.author} - {timestampToStr(comment.timestamp)}
                </CardTitle>
                <CardText>
                  {comment.title} - {comment.body}
                </CardText>
                <Container fluid={true} >
                <Row>
                  <Col md='4'>
                  <span>Votes: {comment.voteScore}&nbsp;</span>
                  <Badge className='voter' color='success' pill onClick={() => voteForComment({commentId: comment.id, upVote: true})}>+</Badge>&nbsp;
                  <Badge className='voter' color='danger' pill onClick={() => voteForComment({commentId: comment.id, upVote: false})}>-</Badge>
                  </Col>
                  <Col md='8'>
                  <Row>
                  {/* <Button className='badge badge-pill' size={'sm'} color='primary' onClick={() => voteForPost({postId: post.id, upVote: true})} >+</Button>
                  <Button className='badge badge-pill' size={'sm'} color='primary' onClick={() => voteForPost({postId: post.id, upVote: false})} >-</Button> */}
                  {/* <Button size={'sm'} color='success' href={`/${post.category}/${post.id}`} >View</Button> */}
                  <AddEditCommentModal
                    comment={comment}
                  />
                  <DeleteModal
                    onClose={this.onCloseDeleteCommentModal}
                    id={comment.id} />
                    </Row>
                  </Col>
                </Row>
                </Container>
              </CardBody>

            </Card>

          ))}
          </Container>
        </Row>
      </Container>
    </div>
    );
  }
}

function mapStateToProps({posts, comments}) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteForComment: (data) => dispatch(voteComment(data)),
    deletePost: (data) => dispatch(removePost(data)),
    deleteComment: (data) => dispatch(removeComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
