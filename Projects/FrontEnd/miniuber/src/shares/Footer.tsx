/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  useEffect(() => {}, []);

  return (
    <footer id="footer" className="footer-area text-center">
      <div className="footer-logo">
        <a href="#">
          <img src="img/logo/footer-logo.png" alt="Footer Logo" />
        </a>
      </div>
      <p className="copyright-text">
        © Copyright© 2023 MiniUber. All right reserved.
      </p>
    </footer>
  );
};

export default Footer;
