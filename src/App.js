import React, { Component } from 'react';
import GroceryList from './GroceryList';
import Login from './Login';
import Header from './Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    }
  }

  onUsernameSubmit(username) {
    if (username)
      this.setState({username: username});
  }

  onLogoutClick() {
    this.setState({username: null});
  }

  render() {
    return (
      <div className="App">
        <Header onLogoutClick={() => this.onLogoutClick()} username={this.state.username}/>
        <div id="appBody">
        {
          this.state.username ? 
          <GroceryList username={this.state.username}/> : 
          <Login onSubmit={(username) => this.onUsernameSubmit(username)}/>
        }
        </div>
      </div>
    );
  }
}

export default App;
