import React from 'react';

class RecipePage extends React.Component {

  constructor() {
    super(props);
  }

  render() {
    return (
      <div className="RecipePage">
        <div id={i} className="Recipe">
          <div>{props.recipe.name}</div>
          {
            props.recipe.ingredients.map((y,j) => {
              return(
                <div id={j}>{y}</div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default RecipePage;