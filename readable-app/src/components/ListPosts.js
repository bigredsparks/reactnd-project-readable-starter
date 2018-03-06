import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
//import { Grid, Row, Col, Table, PageHeader } from 'react-bootstrap'
import { Container, Button, Card, CardBody, CardText, CardTitle, Row, Col, Table, Navbar, NavbarBrand, NavbarToggler, NavbarNav, NavItem, NavLink } from 'mdbreact'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'
import SortHeader from './SortHeader'
import SelectCategory from './SelectCategory'
import sortBy from 'sort-by'
import { votePost } from '../actions'

class ListPosts extends Component {
  state = {
    sortColumn: 'timestamp',
    sortOrder: ''
  }

  sortBy = (column) => {
    // only one column can be sorted at any one time
    this.setState((state) => ({
      sortColumn: column,
      sortOrder: state.sortOrder === '' ? '-' : ''
    }))
  }

  render() {
    const { posts, categories, category, voteForPost } = this.props
    const { sortColumn, sortOrder } = this.state
    let shownPosts = posts

    category && (shownPosts = shownPosts.filter((post) => post.category === category))
    shownPosts && shownPosts.sort(sortBy(sortOrder + sortColumn))

    return (
      <div>
        <Container fluid={true} >
          {/* <Navbar color="indigo" dark expand="md" fixed="top" scrolling> */}
          <Navbar color="indigo" dark expand="md" scrolling>
            <NavbarBrand href="/">Readable</NavbarBrand>
            <div className="collapse navbar-collapse" id="reactNavbar">
              <NavbarNav className="ml-auto">
                <NavItem>
                  <NavLink className="nav-link" to="/">Categories</NavLink>
                </NavItem>
              </NavbarNav>
            </div>
          </Navbar>
        </Container>
        <Container fluid={true} >
          <div>Sorter Goes Here</div>
          {shownPosts && shownPosts.map((post) => (
            <Card>
              <CardBody>
                <CardTitle>
                  {post.author} - {timestampToStr(post.timestamp)}
                </CardTitle>
                <CardText>
                  {post.category} - {post.title} - {post.body}

                {/* <div  className='post-data'>
                <span>Comments: 1 </span>
                <span>Votes: {post.voteScore} </span>
                <a href="#">Up </a>
                <a href="#">Down </a>
                <Button size={'sm'} color='success' href={`/${post.category}/${post.id}`} >View</Button>
                <Button size={'sm'} color="warning">Edit</Button>
                <Button size={'sm'} color="danger">Delete</Button>
                </div> */}
                </CardText>
                <div className='post-data'>
                  <ul>
                    <li>Comments: {post.comments.length} </li>
                    <li>Votes: {post.voteScore} </li>
                    <li><Button className='badge badge-pill' size={'sm'} color='primary' onClick={() => voteForPost({postId: post.id, upVote: true})} >+</Button></li>
                    <li><Button className='badge badge-pill' size={'sm'} color='primary' onClick={() => voteForPost({postId: post.id, upVote: false})} >-</Button></li>
                    <li><Button size={'sm'} color='success' href={`/${post.category}/${post.id}`} >View</Button></li>
                    <li><Button size={'sm'} color="warning">Edit</Button></li>
                    <li><Button size={'sm'} color="danger">Delete</Button></li>
                  </ul>
                </div>

              </CardBody>

            </Card>
          ))}
        </Container>

      </div>
    )
  }
}

function mapStateToProps(posts) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteForPost: (data) => dispatch(votePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);


{/* <Table striped>
<thead>
  <tr>
    <th>Date</th>
    <th>Category</th>
    <th>Post</th>
  </tr>
</thead>
<tbody>
  {shownPosts.map((post) => (
    <tr key={post.id}>
      <td>{timestampToStr(post.timestamp)}</td>
      <td>{capitalize(post.category)}</td>
      <td>author:{post.author} - {post.title} - {post.body} <Link to={`/${post.category}/${post.id}`}>View</Link></td>
    </tr>
  ))}
</tbody>
</Table> */}


{/* <Grid>
<Row className='show-grid'>
  <PageHeader>Readable</PageHeader>
</Row>
<Row className='show-grid'>
  <Col md={2} >
    <SelectCategory
      categories={categories}
    />
  </Col>
  <Col md={10}>
    <div className="ListPosts">
      <div className="posts">
        <h2>Posts</h2>
        <div className="post-list">
          <Table striped bordered condensed hover >
            <thead>
              <tr>
                <th onClick={() => this.sortBy('timestamp')}>
                  <SortHeader
                    display='Date'
                    column='timestamp'
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                  />
                </th>
                <th onClick={() => this.sortBy('category')}>
                  <SortHeader
                    display='Category'
                    column='category'
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                  />
                </th>
                <th>Post</th>
              </tr>
            </thead>
            <tbody>
              {shownPosts.map((post) => (
                <tr key={post.id}>
                  <td>{timestampToStr(post.timestamp)}</td>
                  <td>{capitalize(post.category)}</td>
                  <td>author:{post.author} - {post.title} - {post.body} <Link to={`/${post.category}/${post.id}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  </Col>
</Row>
</Grid> */}
