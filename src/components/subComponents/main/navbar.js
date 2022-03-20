import React from "react";
import { Link, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Link as ScrollLink} from "react-scroll";
import { Intro } from "../../intro";
import { About } from "../../about";
import { Footer } from "../../footer";
import "../../../styles/navbar.css";

const NavbarElements = () => {
  return (
    <div className="navbar">
      {/* <li>
          <Link className="links" id="home-link" activeClass="Intro" to="home" spy={true} smooth={true}>
            Intro
          </Link>
        </li>
        <li>
          <Link className="links" id="about-link" to="About" spy={true} smooth={true}>
            About
          </Link>
        </li>
        <li>
          <Link className="links" id="footer-lin" to="Footer" spy={true} smooth={true}>
            Footer
          </Link>
        </li> */}
      <div id="home-link" className="links">
        <Link
          style={{ textDecoration: "none" }}
          activeClass="Intro"
          to="home"
          spy={true}
          smooth={true}
        >
          Intro
        </Link>
      </div>
      <div id="about-link" className="links">
        <Link
          style={{ textDecoration: "none" }}
          to="about"
          spy={true}
          smooth={true}
        >
          About
        </Link>
      </div>
      <div id="footer-link" className="links">
        <Link
          style={{ textDecoration: "none" }}
          to="footer"
          spy={true}
          smooth={true}
        >
          Footer
        </Link>
      </div>
    </div>
  );
};

export const Navbar = () => {
  return (
    <div style={{ width: "100%" }}>
      <Router>
        <NavbarElements></NavbarElements>
        <Routes>
          <Route path="/" exact component={Intro} />
          <Route path="/About" component={About} />
          <Route path="/Footer" component={Footer} />
        </Routes>
      </Router>
    </div>
  );
};
