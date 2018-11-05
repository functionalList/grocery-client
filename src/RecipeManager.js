import React from 'react'
import RecipeList from './RecipeList'
import RecipeInput from './RecipeInput'

class RecipeManager extends React.Component {

  constructor(props){
    super(props)
    this.state={
      recipes: []
    }
  }

  componentDidMount(){
    this.fetchUserRecipes()
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.fetchUserRecipes();
    }
  }

  async fetchUserRecipes(){

    const response = await fetch("http://localhost:1337/myRecipes/"+ this.props.creator)
    try{
      const recipes = await response.json()
      this.setState({recipes})
    }
    catch(err){
      console.log(err)
    }
  }
  
  render(){
    return (
        <RecipeList  displayrecipe={this.props.displayrecipe} 
        recipes={this.state.recipes} creator={this.props.creator}/>
    )
  }
}

export default RecipeManager