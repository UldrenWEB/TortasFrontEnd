import React from "react";
import "./style.css";

const NavBar = () => {
  return (
    <div className="nav-bar-modificado">
      <div className="profil">
        <img className="avatar" alt="Avatar" src="avatar.png" />
        <div className="content">
          <div className="OVERLINE">PRODUCT MANAGER</div>
          <div className="title">Andrew Smith</div>
        </div>
      </div>
      <div className="navigation">
        <div className="link">
          <img
            className="img"
            alt="Icon home simple"
            src="home-simple-door.svg"
          />
          <div className="label">Dashboard</div>
        </div>
        <div className="div">
          <img className="img" alt="Icon user" src="user-1.svg" />
          <div className="label">Audience</div>
          <img className="icon-chevron" alt="Icon chevron" src="chevron.svg" />
        </div>
        <div className="link">
          <img className="img" alt="Icon page" src="page.svg" />
          <div className="label">Posts</div>
        </div>
        <div className="link">
          <img className="img" alt="Icon calendar" src="calendar.svg" />
          <div className="label">Schedules</div>
        </div>
        <div className="dropdown">
          <div className="link-2">
            <img className="img" alt="Icon reports" src="reports.svg" />
            <div className="label">Income</div>
            <img className="icon-chevron" alt="Icon chevron" src="image.svg" />
          </div>
          <div className="links-container">
            <div className="link-3">
              <div className="text-wrapper">Earnings</div>
              <div className="radius" />
            </div>
            <div className="link-4">
              <div className="text-wrapper">Refunds</div>
              <div className="radius" />
            </div>
            <div className="link-3">
              <div className="text-wrapper">Declines</div>
              <div className="radius" />
            </div>
            <div className="link-3">
              <div className="text-wrapper">Payouts</div>
              <div className="radius" />
            </div>
            <div className="line" />
          </div>
          <img
            className="cursor-pointer"
            alt="Cursor pointer"
            src="pointer.svg"
          />
        </div>
      </div>
      <div className="navigation-final">
        <div className="link-5">
          <img className="img" alt="Icon help circle" src="help-circle.svg" />
          <div className="label-2">Help</div>
        </div>
        <div className="link-5">
          <img className="img" alt="Icon log out" src="log-out.svg" />
          <div className="label-3">Logout Account</div>
        </div>
      </div>
      <img className="button" alt="Button" src="button.svg" />
      <div className="divider" />
    </div>
  );
};

export default NavBar