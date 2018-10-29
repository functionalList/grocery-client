import React from 'react';

function RecipeList(props) {

  return (
    <div className="RecipeList">
      <div>Recipes</div>
      {
        props.recipes.map((x,i) => {
          return(
            <div id={i} className="Recipe">
              <div>{x.name}</div>
              {
                /*
                x.ingredients.map((y,j) => {
                  return(
                    <div id={j}>{y}</div>
                  )
                })
                */
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default RecipeList;