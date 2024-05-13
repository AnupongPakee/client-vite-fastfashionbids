import React, { useEffect, useState } from "react";

// Import Component
import Menu from "../tools/Menu";

// Import Style Css
import "../css/viewexchangenl.css";

// Import Package
import { HashLoader } from "react-spinners";
import { useParams } from "react-router-dom";

function Viewechangenl() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="container-view-exchange-nl">
      {loading ? (
        <HashLoader color="#d636d5" />
      ) : (
        <div className="view-exchange-nl">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-view-exchange-nl">
            <div className="detail">
              <h1>In Development</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewechangenl;
