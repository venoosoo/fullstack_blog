import React, { useEffect, useState } from "react";
import { useUser } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { getUserData, logout } = useUser();
  const navigate = useNavigate();
  const user = getUserData();

  useEffect(() => {
    if (localStorage.getItem('site') === null){
      navigate('/register')
      console.log('umuumumumum')
    } 
    }, []);



  const logOut = () => {
    logout();
    navigate('/index');
  };




  return (
    <div style={{display: "flex", justifyContent: 'center'}} className="container">
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h1>Вітаємо {user.name}!</h1>
        <button onClick={logOut} className="btn-submit">
          Вийти з акаунту
        </button>
      </div>
    </div>
  );
};

export default Dashboard;