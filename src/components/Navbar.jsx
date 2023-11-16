import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  return (
    <div>
      <ul>
        <li><Link to={"/home"}>Ir a home</Link></li>
        <li><Link to={"/prueba/1234/insert/comoestas"}>Ir a prueba con params</Link></li>
        <li><Link to={"/prueba"}>Ir a prueba sin params</Link></li>
      </ul>
    </div>
    // <div className="nav-bar-modificado">
    //   <div className="profil">
    //     <div className="content">
    //       <div className="OVERLINE">PRODUCT MANAGER</div>
    //       <div className="title">Andrew Smith</div>
    //     </div>
    //   </div>
    //   <div className="navigation">
    //     <div className="link">
    //       <div className="label">Dashboard</div>
    //     </div>
    //     <div className="div">
    //       <div className="label">Audience</div>
    //     </div>
    //     <div className="link">
    //       <div className="label">Posts</div>
    //     </div>
    //     <div className="link">
    //       <div className="label">Schedules</div>
    //     </div>
    //     <div className="dropdown">
    //       <div className="link-2">
    //         <div className="label">Income</div>
    //       </div>
    //       <div className="links-container">
    //         <div className="link-3">
    //           <div className="text-wrapper">Earnings</div>
    //           <div className="radius" />
    //         </div>
    //         <div className="link-4">
    //           <div className="text-wrapper">Refunds</div>
    //           <div className="radius" />
    //         </div>
    //         <div className="link-3">
    //           <div className="text-wrapper">Declines</div>
    //           <div className="radius" />
    //         </div>
    //         <div className="link-3">
    //           <div className="text-wrapper">Payouts</div>
    //           <div className="radius" />
    //         </div>
    //         <div className="line" />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="navigation-final">
    //     <div className="link-5">
    //       <div className="label-2">Help</div>
    //     </div>
    //     <div className="link-5">
    //       <div className="label-3">Logout Account</div>
    //     </div>
    //   </div>
    //   <div className="divider" />
    // </div>
  );
};

export default NavBar