import React, { useEffect, useState } from "react";

// Import Style CSS
import "../css/about.css";

// Import Package
import { HashLoader } from "react-spinners";

function About() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="container-about">
      {loading ? (
        <HashLoader color="#d636d5" />
      ) : (
        <div className="content-about">
          <h1>In Development</h1>
          <div className="door-left"></div>
          <div className="door-right"></div>
        </div>
      )}
    </div>
  );
}

export default About;
