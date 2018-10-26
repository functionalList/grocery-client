import React, { Component } from 'react';
import GroceryList from './GroceryList';
import RecipeList from './RecipeList';
import Login from './Login';
import Header from './Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      userID: null,
    }
  }

  onUsernameSubmit = async(username) => {
    if (username) {

      const response = await fetch("http://localhost:1337/users",
        {
          method: "POST", 
          body: JSON.stringify({username}),
          headers: { "Content-Type": "application/json" }
        });
      
      try {
        const user = await response.json()
        this.setState({
          username: username,
          userID: user.id
        });
      } catch(error) {
        console.log(error);
      }

    }
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
          <div>
            <GroceryList username={this.state.username}/>
            <RecipeList username={this.state.username}/>
          </div> :
          <Login onSubmit={(username) => this.onUsernameSubmit(username)}/>
          
        }
        </div>
      </div>
    );
  }
}

export default App;
