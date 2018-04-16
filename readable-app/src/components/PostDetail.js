import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Card, CardBody, CardText, CardTitle, Col, Row, Navbar, NavbarBrand, Badge } from 'mdbreact'
import { connect } from 'react-redux'
import DeleteModal from './DeleteModal'
import AddEditPostModal from './AddEditPostModal'
import AddEditCommentModal from './AddEditCommentModal'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'
import * as actions from '../actions'
import * as PostsApi from './PostsApi'

class PostDetail extends Component {
  componentDidMount() {
    this.fetchPost()
  }

  fetchPost = () => {
    const {postId, getPost, getComments} = this.props
    PostsApi.getPostById(postId).then((post) => {
      getPost(post)
    })

    PostsApi.getPostComments(postId).then((comments) => {
      getComments(comments)
    })
  }

  onCloseDeleteModal = (confirmed, id) => {
    if (confirmed) {
      PostsApi.deletePostById(id).then((post) => {
        this.props.deletePost(post)
      })

      this.props.history.goBack()
    }
  }

  onCloseDeleteCommentModal = (confirmed, id) => {
    if (confirmed) {
      PostsApi.deleteCommentById(id).then((comment) => {
        this.props.deleteComment(comment)
      })
    }
  }

  onVoteForComment = (commentId, vote) => {
    PostsApi.voteComment(commentId, vote).then((comment) => {
      this.props.voteForComment(comment)
    })
  }

  render() {
    const { post, comments } = this.props
    const postComments = comments.filter((comment) => comment.parentId === post.id && !comment.deleted)

    return (
      <div>
        <Container fluid={true} >
        <Navbar color="indigo" dark expand="md" scrolling>
          <NavbarBrand href="/">Readable</NavbarBrand>
        </Navbar>
      </Container>

      <Container>
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
            id={post.id} />
        </Row>

        <Row>
          Comments ({postComments.length})
        </Row>
        <Row>
          <AddEditCommentModal createComment={true} postId={post.id} />
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
                  {comment.body}
                </CardText>
                <Container fluid={true} >
                  <Row>
                    <Col md='4'>
                      <span>Votes: {comment.voteScore}&nbsp;</span>
                      <Badge className='voter' color='success' pill onClick={() => this.onVoteForComment(comment.id, true)}>+</Badge>&nbsp;
                      <Badge className='voter' color='danger' pill onClick={() => this.onVoteForComment(comment.id, false)}>-</Badge>
                    </Col>
                    <Col md='8'>
                      <Row>
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

function mapStateToProps({posts, comments, post}) {
  return {
    posts,
    comments,
    post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteForComment: (data) => dispatch(actions.voteComment(data)),
    deletePost: (data) => dispatch(actions.removePost(data)),
    deleteComment: (data) => dispatch(actions.removeComment(data)),
    getPost: (data) => dispatch(actions.getPost(data)),
    getComments: (data) => dispatch(actions.getComments(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))
