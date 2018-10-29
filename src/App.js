import React, { Component } from 'react';
import GroceryList from './GroceryList';
import RecipeInput from './RecipeInput';
import RecipeList from './RecipeList';
import Login from './Login';
import Header from './Header';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import RecipeManager from './RecipeManager'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      userID: null,
      recipes: []
    }
    this.recipeUpdateHandler = this.recipeUpdateHandler.bind(this);
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
        console.log('users? ', user)
        this.setState({
          username: username,
          userID: user[1][0].ID
        });
        this.updateRecipes();
      } catch(error) {
        console.log(error);
      }
    }
  }

  updateRecipes = async () => {
    const response = await fetch("http://localhost:1337/myRecipes/" + this.state.username,
      {
        method: "GET", 
        headers: { "Content-Type": "application/json" }
      });
    
    try {
      const recipes = await response.json()
        this.setState({recipes});
    } catch(error) {
      console.log(error);
    }
  }

  recipeUpdateHandler(newData) {
    const recipes = [...this.state.recipes, newData];
    this.setState({
      recipes
    });
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
            <BrowserRouter>
              <Switch>
              
              <Route path='/:username' render={props=>(
                
                <RecipeManager userRecipes={this.state.recipes} username={props.match.params.username} 
                userID = {this.state.userID} recipeUpdateHandler={this.recipeUpdateHandler}/>
              )}/>
              <Route path='/' render={props=>(
                <RecipeManager userRecipes={this.state.recipes} username={this.state.username} 
                userID = {this.state.userID} recipeUpdateHandler={this.recipeUpdateHandler}/>
              )}/>
              
              </Switch>
            </BrowserRouter>
          </div> :
          <Login onSubmit={(username) => this.onUsernameSubmit(username)}/>
          
        }
        </div>
      </div>
    );
  }
}

export default App;
