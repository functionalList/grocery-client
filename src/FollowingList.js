import React from 'react'
import {Link} from 'react-router-dom'

class Following extends React.Component{

  constructor(props){
    super(props)
    this.state={
      show: false
    }
  }
  
  render(){
  return (
    <div className='following' >
      <div className='showButton' onClick={()=>{this.setState({show: !this.state.show})}}>Your friends</div>
      {this.state.show && this.props.following.map(each=>(<Link className='friend' to={`/creator/${each.name}`}>{each.name}</Link>))}
    </div>
  )
  }
}

export default Following