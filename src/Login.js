import React, { Component } from 'react';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    }
  }

  usernameInputChangeHandler(e) {
    this.setState({username: e.target.value});
  }

  submitClickHandler() {
    this.props.onSubmit(this.state.username);
  }

  render() {
    return(
      <div>
        <div>Username</div>
        <input
          value={this.state.username}
          onChange={(e) => {this.usernameInputChangeHandler(e)}} 
        />
        <div 
          className="button" 
          onClick={() => {this.submitClickHandler()}}>Submit</div>
      </div>
    )
  }
  
}
export default Login;