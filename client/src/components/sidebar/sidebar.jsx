import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaBars, FaHome } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { MdUpdate } from "react-icons/md";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import "./sidebar.css";
import Axios from "axios";

// const SERVER = 'https://passwordmanager-l5wn.onrender.com/logout';
const SERVER = "https://safe-pass-backend.vercel.app/logout";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  Axios.defaults.withCredentials = true;

  const logout = () => {
    window.location.href = "/";
    Axios.get(SERVER)
      .then(() => {
        console.log("you logged out");
      })
      .catch(() => {
        console.log("you logged out");
      });
  };
  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/add",
      name: "Add Password",
      icon: <BsDatabaseFillAdd />,
    },
    {
      path: "/show",
      name: "My Passwords",
      icon: <BsFillEyeFill />,
    },
    {
      path: "/update",
      name: "Update Password",
      icon: <MdUpdate />,
    },
    {
      path: "/remove",
      name: "Remove Pass",
      icon: <MdDelete />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserFriends />,
    },
  ];

  return (
    <div className="containers">
      <div className="sidebar" style={{ width: isOpen ? "350px" : "70px" }}>
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} onClick={toggle}>
            SafePass
          </h1>
          <div className="icon" style={{ marginLeft: isOpen ? "20px" : "0px" }}>
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="list-item">
          {menuItem.map((item, i) => {
            return (
              <NavLink
                to={item.path}
                key={i}
                className="link"
                activeclassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </NavLink>
            );
          })}
        </div>
        <div className="logout" onClick={logout}>
          <RiLogoutBoxFill size={30} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
