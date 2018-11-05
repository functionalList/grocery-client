import React from 'react';
import { Link } from 'react-router-dom';

function RecipeList(props) {
  console.log(props);
  return (
    <div className="RecipeList">
      <div>{`${props.username}'s Recipes!`}</div>
      {
        !props.isSelf && 
        <button className='followButton' onClick={props.followNew}>Follow! +</button>
      }
      {
        props.recipes.map((x,i) => {
          return(
            <div id={i} className="Recipe">
              <Link to={`${props.username}/${x.name}`}>{x.name}</Link>
              {
                x.recipeName == props.displayrecipe && x.ingredients && (
                x.ingredients.map((each) => {
                  return(<div>each.name</div>);
                }))
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default RecipeList;