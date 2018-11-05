import React from 'react';
import { Link } from 'react-router-dom';

function RecipeList(props) {
  console.log(props);
  return (
    <div className="RecipeList">
      {
        props.recipes.map((x,i) => {
          return(
            <div id={i} className="Recipe">
              <Link to={`/creator/${props.creator}/${x.recipeName}`}>{x.recipeName}</Link>
              {
                x.recipeName === props.displayrecipe && x.ingredients && (
                x.ingredients.split(",").map((each) => {
                  return(<div>{each}</div>);
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