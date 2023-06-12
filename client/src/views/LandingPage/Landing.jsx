import React from "react";
import "./Landing.css";
import { TbBrandGithub, TbBrandTwitter, TbBrandLinkedin } from "react-icons/tb";

const Landing = () => {
  const handleLoginClick = () => {
    window.location.href = "/#/login";
  };
  const handleRegisterClick = () => {
    window.location.href = "/#/register";
  };
  return (
    <div className="landing-container">
      <div className="landing-wraper">
        <div className="landing-top">
          <nav>
            <div className="logo">
              <h1>
                <span className="safe">Safe</span>pass
              </h1>
            </div>
            <div className="nav-list">
              <button className="login" onClick={handleLoginClick}>
                Login
              </button>
              <button className="register" onClick={handleRegisterClick}>
                Register
              </button>
            </div>
          </nav>
        </div>
        <div className="main">
          <h1>Move fast and securely with our password manager.</h1>
          <p>
            Drive collaboration, boost productivity, and experience the power of
            open source with Safepass, the easiest way to secure all your
            passwords.
          </p>
        </div>
      </div>
      <div className="footer">
        <div className="links">
          <ul>
            <li>
              <a
                href="https://github.com/thenew-programer"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <TbBrandGithub className="icon" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/youssef_bouryal"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <TbBrandTwitter className="icon" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/youssef-bouryal/"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <TbBrandLinkedin className="icon" />
              </a>
            </li>
          </ul>
        </div>
        <div className="allRight">2023 &copy; all right Reserved.</div>
      </div>
    </div>
  );
};

export default Landing;
