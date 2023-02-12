import React from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.navbarContent}`}>
        <img src={logo} width="180" alt="CloudSEK" />
        <div className={`${styles.heading}`}>
          <h2>House Recommendation</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
