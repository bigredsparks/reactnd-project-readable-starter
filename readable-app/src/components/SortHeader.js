import React, { Component } from 'react'
import SortedUp from 'react-icons/lib/ti/arrow-sorted-up'
import SortedDown from 'react-icons/lib/ti/arrow-sorted-down'
import Unsorted from 'react-icons/lib/ti/arrow-unsorted'

class SortHeader extends Component {
  render() {
    const { display, column, sortColumn, sortOrder } = this.props
    return (
      <div>
        {display}
        {
          sortColumn === '{column}'
          ? sortOrder === ''
            ? <SortedUp size={30} />
            : <SortedDown size={30} />
          : <Unsorted size={30} />
        }
        </div>

    );
  }
}

export default SortHeader
