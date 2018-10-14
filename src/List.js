import React, { Fragment } from 'react';
import './App.css';

function List(props) {
  return(
    <Fragment>
      <ul>
      {
        props.data.map((elt,idx) => {
          return(
            <li key={idx}>
              {elt}
            </li>
          );
        })
      }
      </ul>
    </Fragment>
  )
}
export default List;