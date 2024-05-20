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
        <HashLoader color="#e8175d" />
      ) : (
        <div className="index">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-index">
            <div className="content">
              <div className="bg-index">
                <a href="https://www.freepik.com/free-ai-image/futuristic-store-with-abstract-concept-architecture_152329534.htm#fromView=search&page=4&position=8&uuid=2b2bcafb-f08c-4825-9c35-f9e79dedf097">Ref: https://www.freepik.com/free-ai-image/futuristic-store-with-abstract-concept-architecture_152329534.htm#fromView=search&page=4&position=8&uuid=2b2bcafb-f08c-4825-9c35-f9e79dedf097</a>
                <h1 className="text-head">
                  Welcome To FastFashion Bids <br /> You Can {" "}
                  <span>
                    <Typewriter
                      words={["Exchange"]}
                      loop={false}
                      cursor
                      cursorStyle="|"
                      cursorColor="#e8175d"
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
