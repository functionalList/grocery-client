import React from 'react';

function RecipeList(props) {

  return (
    <div className="RecipeList">
      <div>{`${props.username}'s Recipes!`}</div>
      <button className='followButton' onClick={props.followNew}>Follow! +</button>
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