import React, { Component } from 'react';
import List from './List';
import './App.css';

class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputGrocery: "",
      groceries: [],
      isCheckoutMode: false,
    }
  }

  componentDidMount() {
    var currentGroceries = this.state.groceries;
    this.callApi()
      .then(res => {
        this.setState({ groceries: currentGroceries.concat(res.express) });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/")
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  
  addClickHandler() {
    if (this.state.inputGrocery)
      this.state.groceries.push(this.state.inputGrocery);
    this.setState({inputGrocery: ""});
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
        <div className="button" onClick={() => {this.setState({isCheckoutMode: true})}}>Checkout</div>
        {
          this.state.isCheckoutMode && 
          <div>Checked out!</div>
        }
      </div>
    );
  }
}

export default GroceryList;