import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import { Grid, Row, Col, Table, PageHeader } from 'react-bootstrap'
import { Container, Table } from 'mdbreact'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'
import SortHeader from './SortHeader'
import SelectCategory from './SelectCategory'
import sortBy from 'sort-by'

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
    const { posts, categories, category } = this.props
    const { sortColumn, sortOrder } = this.state
    let shownPosts = posts

    category && (shownPosts = shownPosts.filter((post) => post.category === category))

//    shownPosts.forEach((p) => (console.log(p.timestamp)))
    shownPosts.sort(sortBy(sortOrder + sortColumn))
    console.log("sortColumn", sortColumn)

    return (
      <div>
      <Container>

      </Container>
      <Container fluid={true}>
        <Table striped>
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
        </Table>
      </Container>
      </div>
    )
  }
}

export default ListPosts;


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
