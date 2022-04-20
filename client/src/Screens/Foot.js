import React from "react";
import logo from "../img/logo.png";

const Foot = () => {
  return (
    <footer id="footer-2-cols" class="site-footer">
      <div id="footer-container">
        <div id="footer-grid">
          <div id="left-footer-section" class="footer-section">
            {/* <div id="footer-search">
                  <form action="">
                      <input type="search" placeholder="Web design"/><button type="submit"/>Search</button>
                  </form>
              </div> */}
            <div class="footer-information">
              <p>
                <img src="https://img.icons8.com/ios-filled/12/999999/marker.png" />
                66 Avenue les Champs Elysées
              </p>
              <p>
                <img src="https://img.icons8.com/ios-filled/12/999999/phone.png" />
                01 342424 252 62
              </p>
              <p>
                <img src="https://img.icons8.com/ios-filled/12/999999/mail.png" />
                contact@fastdream.fr
              </p>
              <p>
                <img src="https://img.icons8.com/ios-filled/12/999999/clock.png" />
                24/7
              </p>
            </div>
          </div>
          <div id="right-footer-section" class="footer-section">
            <div class="footer-links">
              <ul>
                <li role="menuitem">
                  <a>Home</a>
                </li>
                <li role="menuitem">
                  <a>About</a>
                </li>
                <li role="menuitem">
                  <a>Contact Information</a>
                </li>
                <li role="menuitem">
                  <a>
                    Terms of Use
                    <br />& Legal Information
                  </a>
                </li>
                <li role="menuitem">
                  <a>Message Us</a>
                </li>
                <li role="menuitem">
                  <a>Leave a Feedback</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="copyright-information">
          <div id="footer-logo-section">
            <div id="footer-logo">
              <img src={logo} width="30%" alt="" />
            </div>
          </div>
          <div id="copyright-text">
            &copy; FastDream Inc. 2022. All rights reserved.
          </div>
          <div id="social-buttons">
            <img src="https://img.icons8.com/ios-filled/25/999999/facebook--v1.png" />
            <img src="https://img.icons8.com/ios-filled/25/999999/telegram-app.png" />
            <img src="https://img.icons8.com/ios-filled/25/999999/pinterest--v1.png" />
            <img src="https://img.icons8.com/ios-filled/25/999999/instagram--v1.png" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
