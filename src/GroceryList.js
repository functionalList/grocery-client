import React, { Component } from 'react';
import List from './List';
import './SCSS/GroceryList.scss'

class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputGrocery: "",
      groceries: [],
      isCheckoutMode: false,
    }
    //this.fetchGroceries = this.fetchGroceries.bind(this)
  }

  /*
  componentDidMount() {
    this.fetchGroceries()
  }

  fetchGroceries = async () => {
    const response = await fetch("http://localhost:1337/groceries");
    const groceries = await response.json();
    try {
      this.setState({groceries})
    }
    catch(error) {
      console.log(error)
    }
  };
  */
  
  addClickHandler() {
    if (this.state.inputGrocery)
      this.state.groceries.push({name: this.state.inputGrocery});
    this.setState({inputGrocery: ""});
  }

  checkoutClickHandler = async () => {

    //userId is hardcoded for now - let's wire it up
    const userId = 2
    const response = await fetch("http://localhost:1337/groceries",
      {
        method: "POST", 
        body: JSON.stringify({groceries: this.state.groceries, userId }),
        headers: { "Content-Type": "application/json" }
      });
    
    try {
      const rez = await response.json()
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
        <div className="button add" onClick={() => {this.addClickHandler()}}>Add</div>
        <List data={this.state.groceries} />
        <div className="button checkout" onClick={() => {this.checkoutClickHandler()}}>Checkout</div>
        {
          this.state.isCheckoutMode && 
          <div>Checked out!</div>
        }
      </div>
    );
  }
}

export default GroceryList;