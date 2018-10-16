import React from 'react';

function Header(props) {
  return(
    <div id="header">
      <div id="logo">Grocer</div>
      {
        props.username &&
        <div className="userInfoContainer">
          <div className="headerElement">{props.username}</div>
          <br />
          <div 
            className="button headerElement"
            onClick={() => props.onLogoutClick()}
          >Log out</div>
        </div>
      }
    </div>
  )
}
export default Header;