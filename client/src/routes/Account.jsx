import React, { useEffect, useState } from "react";
import NavbarAccount from "../components/NavbarAccount/NavbarAccount";
import "../styles/account.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function Account() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/userdetails", { 
        withCredentials: true,
        headers: {
          'Authorization':`Bearer ${Cookies.get('sessionId')}`
        }
       })
      .then((response) => {
        setUserData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error axios user details", error);
      });
  }, []);

  return (
    <div className="page">
      <NavbarAccount />
      <div className="info-account">
        {userData && (
          <div className="side-bar-acount">
            <span className="dot"></span>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
          </div>
        )}
        <div className="user-details-box">
          {userData && (
            <div className="main-info">
              <div className="ps-info">
                <h1>Personal info</h1>
                <div>
                  <p>Fullname: {userData.fullname}</p>
                  <p>City: {userData.city}</p>
                  <p>School: {userData.school}</p>
                  <p>Grade: {userData.grade}</p>
                </div>
              </div>
              <div className="about-me">
                <h1>About me</h1>
                <p>{userData.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
