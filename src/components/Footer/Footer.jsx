import "./Footer.css";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="box-container">
        <div className="box">
          <h3>
          VK Footwear <i className="fa-solid fa-shoe-prints
"></i>
          </h3>
          <p>
          Experience the perfect blend of freshness, comfort, and organic materials designed for your lifestyle.
          </p>
          <div className="share">
            <a href="#" className="fab fa-facebook-f"></a>
            <a href="#" className="fab fa-twitter"></a>
            <a href="#" className="fab fa-instagram"></a>
            <a href="#" className="fab fa-linkedin"></a>
          </div>
        </div>
        <div className="box">
          <h3>contact info</h3>
          <a href="#" className="links">
            {" "}
            <i className="fas fa-phone"></i>03193023619{" "}
          </a>
          <a href="#" className="links">
            {" "}
            <i className="fas fa-phone"></i>03193023619{" "}
          </a>
          <a href="#" className="links">
            {" "}
            <i className="fas fa-envelope"></i>  vivekpanu178@gmail.com{" "}
          </a>
          <a href="#" className="links">
            {" "}
            <i className="fas fa-map-marker-alt"></i> Sukkur, Pakistan{" "}
          </a>
        </div>
        <div className="box">
          <h3>quick links</h3>
          <a href="#home" className="links">
            {" "}
            <i className="fas fa-arrow-right"></i> home{" "}
          </a>
          <a href="#features" className="links">
            {" "}
            <i className="fas fa-arrow-right"></i> features{" "}
          </a>
          <a href="#products" className="links">
            {" "}
            <i className="fas fa-arrow-right"></i> products{" "}
          </a>
          <a href="#categories" className="links">
            {" "}
            <i className="fas fa-arrow-right"></i> categories{" "}
          </a>
          <a href="#review" className="links">
            {" "}
            <i className="fas fa-arrow-right"></i> review{" "}
          </a>
        </div>
        <div className="box">
          <h3>newsletter</h3>
          <p>subscribe for latest updates</p>
          <input type="email" placeholder="your email" className="email" />
          <input type="submit" value="subscribe" className="btn" />
        </div>
      </div>
    <div className="credit">
        created by <span>Vivek</span> | all rights reserved
    </div>
    </div>
  );
}

export default Footer;
