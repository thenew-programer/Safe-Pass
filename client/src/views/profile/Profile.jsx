import React, { useEffect, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import Axios from "axios";
import "./profile.css";
import {
  notifyFailure,
  notifyFieldFailure,
  notifySuccess,
} from "../../utils/notifacations";

// const SERVER = 'https://passwordmanager-l5wn.onrender.com/';
const SERVER = "https://safe-pass-backend.vercel.app/";

const Profile = () => {
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sudo, setSudo] = useState("");
  const [theme, setTheme] = useState("white");
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    getUserInfo();
    const color = document.body.getAttribute("data-theme");
    setTheme(color === "light" ? "black" : "white");
  }, []);

  const getUserInfo = () => {
    Axios.get(SERVER + "user")
      .then((response) => {
        setId(response.data._id);
        setEmail(response.data.email);
      })
      .catch((err) => {
        if (err.response.status === 405) {
          window.location.href = "/#/login";
        } else {
          notifyFailure("Failed, Please refresh the page");
        }
      });
  };

  const handleResetClick = () => {
    if (!newPass || !oldPass) {
      notifyFieldFailure("Fill all the fields");
    } else {
      Axios.patch(SERVER + "update", {
        id: id,
        oldPass: oldPass,
        newPass: newPass,
      })
        .then(() => {
          setErrorMsg("");
          notifySuccess("Password reset successfully");
        })
        .catch((err) => {
          if (err.response.status === 405) {
            window.location.href = "/#/login";
          } else if (err.response.status === 401) {
            notifyFailure("Old password incorrect");
          } else {
            notifyFailure("Reset password Failed");
          }
        });
    }
  };

  const handleDeleteClick = () => {
    if (sudo !== "sudo delete my account") {
      setIsError(true);
    } else {
      setIsError(false);
      Axios.delete(SERVER + "delete", {
        data: {
          id: id,
        },
      })
        .then((response) => {
          console.log(response.data);
          setIsClicked(false);
          window.location.href = "/";
        })
        .catch((err) => {
          if (err.response.status === 405) {
            setIsClicked(false);
            window.location.href = "/#/login";
          } else {
            setIsClicked(false);
            window.location.href = "/";
          }
        });
    }
  };

  return (
    <div className="div">
      <div className="profile-container">
        <div className="profile-wraper">
          <div className="user-data">
            <h4>Profile</h4>
            <label for="email" className="label-email">
              Email
            </label>
            <input type="text" id="profile-email" value={email} readOnly />
            <label htmlFor="oldpassword" className="label-old-pass">
              Old Password
            </label>
            <input
              type={visible ? "text" : "password"}
              id="oldpassword"
              onChange={(e) => setOldPass(e.target.value)}
            />
            <div
              className="visibility-top"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
            <label htmlFor="newpassword" className="label-new-pass">
              New Password
            </label>
            <input
              type={visible ? "text" : "password"}
              id="newpassword"
              onChange={(e) => setNewPass(e.target.value)}
            />
            <div
              className="visibility-bottom"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
            <p
              style={{
                color: "red",
                fontSize: "0.824rem",
                margin: "auto",
                marginTop: 0,
              }}
            >
              {errorMsg}
            </p>
            <button type="button" onClick={handleResetClick}>
              Reset Password
            </button>
          </div>
          <div className="delete-account">
            <button
              type="button"
              onClick={() => {
                setIsClicked(true);
              }}
            >
              Delete Account
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
      {isClicked && (
        <div className="delete">
          <div className="delete-conf">
            <h1>Delete Account</h1>
            <div className="verify-field">
              <label htmlFor="delete">
                To verify, type{" "}
                <span className="sudo">sudo delete my account</span>.
              </label>
              <input
                type="text"
                id="delete"
                minLength={22}
                maxLength={22}
                style={{ borderColor: isError ? "red" : { theme } }}
                onChange={(e) => setSudo(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button
                type="button"
                id="cancel"
                onClick={() => setIsClicked(false)}
              >
                Cancel
              </button>
              <button type="submit" id="btn-delete" onClick={handleDeleteClick}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
