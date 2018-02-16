import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils/stringUtils'

class SelectCategory extends Component {
  render() {
    const { categories } = this.props

    return (
      <div className="categories">
        <h2>Categories</h2>
        <div className="category-list">
          <ul>
            <li><Link to={'/'}>All</Link></li>
              {categories.map((category) =>(
                <li key={category}><Link to={`/${category}`}>{capitalize(category)}</Link></li>
              ))}
          </ul>
        </div>
      </div>
  )}
}

export default SelectCategory
