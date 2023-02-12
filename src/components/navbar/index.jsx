import React from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.navbarContent}`}>
        <img src={logo} width="120" alt="CloudSEK" />
        <div className={`${styles.heading}`}>
          <span>House Recommendation</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
