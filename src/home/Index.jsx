import React, { useEffect, useState } from "react";

import { getExchange } from "../../api/exchange"

// Import Style Css
import "../css/index.css";

// Import Component
import Menu from "../tools/Menu";
import Products from "../components/Products";

// Import Package
import { HashLoader } from "react-spinners";
import { Typewriter } from "react-simple-typewriter";

function Index() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="container-index">
      {loading ? (
        <HashLoader color="#d636d5" />
      ) : (
        <div className="index">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-index">
            <div className="content">
              <div className="bg-index">
                <h1 className="text-head">
                  Welcome To FastFashion Bids <br /> You Can {" "}
                  <span>
                    <Typewriter
                      words={["Auction", "Exchange"]}
                      loop={false}
                      cursor
                      cursorStyle="|"
                      cursorColor="#00ff80"
                      typeSpeed={120}
                      deleteSpeed={60}
                    />
                  </span>
                </h1>
              </div>
              <Products />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
