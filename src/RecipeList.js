import React, { Component } from 'react';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
  }
  
  addClickHandler() {
    if (this.state.inputGrocery)
      this.state.groceries.push({name: this.state.inputGrocery});
    this.setState({inputGrocery: ""});
  }

  componentDidMount = async () => {
    const response = await fetch("http://localhost:1337/myRecipes/" + this.props.username,
      {
        method: "GET", 
        headers: { "Content-Type": "application/json" }
      });
    
    try {
      const rez = await response.json()
        console.log(rez);
        this.setState({recipes: rez});
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="RecipeList">
        <div>Recipes</div>
        {
          this.state.recipes.map((x,i) => {
            return(
              <div id={i} className="Recipe">
                <div>{x.name}</div>
                <div>Created by {x.creator}</div>
                {
                  x.ingredients.map((y,j) => {
                    return(
                      <div id={j}>{y}</div>
                    )
                  })
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default RecipeList;