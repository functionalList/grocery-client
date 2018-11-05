import React from 'react'
import {Link} from 'react-router-dom'

const Following = props => {
  return (
    <div className='following'>
      <h3>Your friends</h3>
      {props.following.map(each=>(<Link className='friend' to={`/creator/${each.name}`}>{each.name}</Link>))}
    </div>
  )
}

export default Following