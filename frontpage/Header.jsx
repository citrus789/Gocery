// import React from 'react'

// export default function Header() {
//   return (
//     <div className="img-container">
//         <img src="/assets/cover.jpg" alt="" className="cover"/>
//     </div>
//   )
// }
import React, { useState } from "react";
import "./header.css";
const Header = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      {/* <button onClick={() => setClicked(!clicked)}>ClickME</button>
      {clicked === true ? (
        <>
          <div>u clicked it.. click again to go back</div>
        </>
      ) : ( */}
      <div className="pictures">
        <div className="logo">
          <img src="/assets/logo.jpg" alt="" className="logo" />
        </div>

        {/* <div className="img-container"> */}
        <div className="produce">
          <div alt="" className="cover">
            <button>click me</button>
          </div>
        </div>
        <div>
          <hr
            style={{
              // paddingTop: "1px",
              background: "darkgreen",
              color: "darkgreen",
              borderColor: "darkgreen",
              height: "3px",
            }}
          />

          <p className="subtitle">
            WE <br />
            know the place to go,
            <br />
            where prices are LOW!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
