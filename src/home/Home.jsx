import React, { useEffect, useState } from "react";

// Import Style Css
import "../css/home.css";

// Import Component
import Menu from "../tools/Menuauth";
import Products from "../components/Products";

// Import Package
import { HashLoader } from "react-spinners";
import { Typewriter } from "react-simple-typewriter";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="container-home">
      {loading ? (
        <HashLoader color="#d636d5" />
      ) : (
        <div className="home">
          <div className="menu">
            <Menu />
          </div>
          <div className="content-home">
            <div className="content">
              <div className="bg-home">
                <h1 className="text-head">
                  Welcome To FastFashion Bids <br /> You Can{" "}
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

export default Home;
