import React from "react";
import "./Footer.css";
import { TbBrandGithub, TbBrandTwitter, TbBrandLinkedin } from "react-icons/tb";

const Footer = () => {
  return (
    <div>
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

export default Footer;
