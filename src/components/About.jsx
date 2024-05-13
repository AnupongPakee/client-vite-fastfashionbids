import React, { useEffect, useState } from "react";

import Mrnu from "../assets/images/mrnu.jpg";
import Okbook from "../assets/images/okbook.png";

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
          <div className="door-left"></div>
          <div className="door-right"></div>
          <div className="fontend">
            <div className="image">
              <img src={Mrnu} alt="Image_Mrnu" />
            </div>
            <div className="name">
              <h2>อนุพงศ์ ภาคี</h2>
              <h2>( Anupong Pakee )</h2>
            </div> <br />
            <div className="position">
              <h3>Fontend</h3>
            </div>
          </div>
          <div className="backend">
            <div className="image">
              <img src={Okbook} alt="Image_Okbook" />
            </div>
            <div className="name">
              <h2>ชลสิทธิ๋ ธรรมจักษ์</h2>
              <h2>( Chonlasit Thammajak )</h2>
            </div> <br />
            <div className="position">
              <h3>Backend</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
