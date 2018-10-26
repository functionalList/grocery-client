import React, { Component } from 'react';

class RecipeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputIngredient: "",
    }
  }
  
  addClickHandler() {
    if (this.state.inputGrocery)
      this.state.groceries.push({name: this.state.inputGrocery});
    this.setState({inputGrocery: ""});
  }

  submitClickHandler = async () => {
    const response = await fetch("http://localhost:1337/groceries",
      {
        method: "POST", 
        body: JSON.stringify({data: this.state.groceries}),
        headers: { "Content-Type": "application/json" }
      });
    
    try {
      const rez = await response.json()
        console.log('res ', rez)
        this.setState({groceries: []});
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="GroceryList">
        <input 
          value={this.state.inputGrocery}
          onChange={(e) => {this.setState({inputGrocery: e.target.value})}} 
        />
        <div className="button" onClick={() => {this.addClickHandler()}}>Add</div>
        <List data={this.state.groceries} />
        <div className="button" onClick={() => {this.checkoutClickHandler()}}>Checkout</div>
        {
          this.state.isCheckoutMode && 
          <div>Checked out!</div>
        }
      </div>
    );
  }
}

export default RecipeList;