import React, { Component } from 'react';
import GroceryList from './GroceryList';
import RecipeInput from './RecipeInput';
import RecipeList from './RecipeList';
import Login from './Login';
import Header from './Header';
import './App.css';
import './SCSS/App.scss'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import RecipeManager from './RecipeManager'
import Following from './FollowingList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      userID: null,
      recipes: [],
      friends: []
    }
    this.recipeUpdateHandler = this.recipeUpdateHandler.bind(this);
    this.followNew=this.followNew.bind(this)
  }

  fetchFollowing = async(userId) => {
    const response = await fetch("http://localhost:1337/users/friends/" +userId)
    try {
      const friends = await response.json()

      this.setState({friends})
    }
    catch(err){
      console.log(err)
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

        const userID = user[1][0].ID

        this.setState({
          username: username,
          userID
        });
        this.updateRecipes()
        this.fetchFollowing(userID)

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
      const recipes = await response.json();
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

  async followNew(creator) {

    const body =  {
      method: "POST", 
      body: JSON.stringify({followerId: this.state.userID}),
      headers: { "Content-Type": "application/json" }
    }
    const response = await fetch(`http://localhost:1337/users/follow/${creator}`, body)
    try{
      if(response.status===200) this.setState({friends: [...this.state.friends, {name: creator}]})
    }
    catch(err){
      console.log(err)
    }
  }

  onLogoutClick() {
    this.setState({username: null});
  }

  render() {

    console.log(this.state.friends, 'huhhh')
    return (
      <div className="App">
        <Header onLogoutClick={() => this.onLogoutClick()} username={this.state.username}/>
        <div id="appBody">
        {
          this.state.username ? 
          <div>
            <GroceryList username={this.state.username}/>
           
            <BrowserRouter>
              <div>
                <Following following={this.state.friends}/>
                <Route path='/creator/:username/:recipeName?' render={props=>(
                  <div className = 'friend'>
                   <span>{`${props.match.params.username}'s Recipes!`}</span>
                   {
                     !this.state.friends.find(each=>each.name===props.match.params.username) ?
                     <button className='followButton' onClick={()=>{this.followNew(props.match.params.username)}}>Follow! +</button>
                     : <div className='followed'>O</div>
                   }
                  <RecipeManager friends={this.state.friends} isSelf={false} userRecipes={this.state.recipes} creator={props.match.params.username} 
                  displayrecipe={props.match.params.recipeName} userID = {this.state.userID} 
                  followNew={this.followNew} recipeUpdateHandler={this.recipeUpdateHandler}/>
                  </div>
                )}/> 
                <h2>Your recipes!</h2>
                <RecipeManager friends={this.state.friends} isSelf={true} userRecipes={this.state.recipes} creator={this.state.username} 
                  userID = {this.state.userID} 
                  recipeUpdateHandler={this.recipeUpdateHandler}/>
                <RecipeInput recipeUpdateHandler={this.recipeUpdateHandler} userID={this.state.userID}/>
              </div>
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
