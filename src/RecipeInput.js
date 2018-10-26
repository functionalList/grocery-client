import React, { Component } from 'react';
import List from './List';

class RecipeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeTitle: "",
      inputIngredient: "",
      ingredients: []
    }
  }
  
  addClickHandler() {
    const ingredients = [...this.state.ingredients, {name: this.state.inputIngredient}];
    this.setState({ingredients, inputIngredient: ""});
  }

  submitClickHandler = async () => {
    const response = await fetch("http://localhost:1337/myRecipes/",
      {
        method: "POST", 
        body: JSON.stringify({
          userID: this.props.userID,
          ingredients: this.state.ingredients,
          title: this.state.recipeTitle
        }),
        headers: { "Content-Type": "application/json" }
      });
    
    try {
      const rez = await response.json()
        this.props.recipeUpdateHandler({
          userID: rez.id,
          ingredients: this.state.ingredients,
          title: this.state.recipeTitle
        });
        this.setState({ingredients: []});
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="RecipeInput">
        <div>Title</div>
        <input 
          value={this.state.recipeTitle}
          onChange={(e) => {this.setState({recipeTitle: e.target.value})}} 
        />
        <input 
          value={this.state.inputIngredient}
          onChange={(e) => {this.setState({inputIngredient: e.target.value})}} 
        />
        <div className="button" 
          onClick={() => {this.addClickHandler()}}
          disabled={!this.state.inputIngredient}
          >Add</div>
        <List data={this.state.ingredients} />
        <div className="button" onClick={() => {this.submitClickHandler()}}>Submit</div>
      </div>
    );
  }
}

export default RecipeInput;