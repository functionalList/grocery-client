import React from 'react'
import RecipeList from './RecipeList'
import RecipeInput from './RecipeInput'

class RecipeManager extends React.Component {

  constructor(props){
    super(props)
    this.state={
      recipes: []
    }
    this.followNew=this.followNew.bind(this)
  }

  componentDidMount(){
    this.fetchUserRecipes()
  }

  componentDidUpdate(prevProps) {
    if (this.props.username != prevProps.username) {
      this.fetchUserRecipes();
    }
  }

  async fetchUserRecipes(){

    const response = await fetch("http://localhost:1337/myRecipes/"+ this.props.username)
    try{
      const recipes = await response.json()
      console.log('these are the recipes ', recipes)
      this.setState({recipes})
    }
    catch(err){
      console.log(err)
    }
  }

  async followNew() {
    console.log(this.props)

    const body =  {
      method: "POST", 
      body: JSON.stringify({followerId: this.props.userID}),
      headers: { "Content-Type": "application/json" }
    }

    const response = await fetch(`http://localhost:1337/users/follow/${this.props.username}`, body)
    
    console.log('we followed!')
  }

  render(){

    return (
      <div className = 'friend'>
        <RecipeList isSelf={this.props.isSelf} followNew= {this.followNew} recipes={this.state.recipes} username={this.props.username}/>
        {
          this.props.isSelf &&
          <RecipeInput recipeUpdateHandler={this.props.recipeUpdateHandler} userID={this.props.userID}/>
        }
      </div>
    )
  }
}

export default RecipeManager