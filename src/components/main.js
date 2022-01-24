import React, { Component } from "react";
import { Intro } from "./intro";
import { About } from "./about";
import { Footer } from "./footer";

export class Main extends Component {
  render() {
    return (
      <div>
        <h1>This is main component</h1>
        <Intro></Intro>
        <About></About>
        <Footer></Footer>
      </div>
    );
  }
}
