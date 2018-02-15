import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Table, PageHeader } from 'react-bootstrap'
import { timestampToStr } from '../utils/dateUtils'
import { capitalize } from '../utils/stringUtils'

import SortedUp from 'react-icons/lib/ti/arrow-sorted-up'
import SortedDown from 'react-icons/lib/ti/arrow-sorted-down'
import Unsorted from 'react-icons/lib/ti/arrow-unsorted'
import sortBy from 'sort-by'

class ListPosts extends Component {
  state = {
    sortColumn: 'timestamp',
    sortOrder: ''
  }

  sortBy = (column) => {
    console.log("event:", column)
    this.setState((state) => ({
      sortColumn: column,
      sortOrder: state.sortOrder === '' ? '-' : ''
    }))
  }

  render() {
    const { posts, categories } = this.props
    const { sortColumn, sortOrder } = this.state
    let shownPosts = posts

//    shownPosts.forEach((p) => (console.log(p.timestamp)))
    shownPosts.sort(sortBy(sortOrder + sortColumn))
//    shownPosts.forEach((p) => (console.log(p.timestamp)))

    console.log("sortColumn", sortColumn)

    return (
      <Grid>
        <Row className='show-grid'>
          <PageHeader>Readable</PageHeader>
        </Row>
        <Row className='show-grid'>
          <Col md={2} >
            <div className="categories">
              <h2>Categories</h2>
              <div className="category-list">
                <ul>
                <li><Link to={'/'}>All</Link></li>
                  {categories.map((category) =>(
                    <li><Link to={`/${category}`}>{capitalize(category)}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
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
                          <h4>Date
                          {
                            sortColumn === 'timestamp'
                            ? sortOrder === ''
                              ? <SortedUp size={30} />
                              : <SortedDown size={30} />
                            : <Unsorted size={30} />
                          }
                          </h4>
                        </th>
                        <th onClick={() => this.sortBy('category')}>
                          <h4>
                            Category
                            {
                              sortColumn === 'category'
                              ? sortOrder === ''
                                ? <SortedUp size={30} />
                                : <SortedDown size={30} />
                              : <Unsorted size={30} />
                            }
                          </h4>
                        </th>
                        <th><h4>Post</h4></th>
                      </tr>
                    </thead>
                    <tbody>
                      {shownPosts.map((post) => (
                        <tr>
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
      </Grid>
    );
  }
}

export default ListPosts;
