import React from "react";
import { Intro } from "./intro";
import { About } from "./about";
import { Footer } from "./footer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "../styles/main.css";

export const Main = () => {
  return (
    <div>
      {/* <h1>This is main component</h1> */}
      <Parallax pages={3} style={{ top: "0", left: "0" }}>
        {/* <ParallaxLayer
          offset={0}
          speed={2}
          style={{ backgroundColor: "#E7F2F8" }}
        /> */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <p>Scroll down</p> */}
          <Intro></Intro>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={2}
          style={{ backgroundColor: "#74BDCB" }}
        />

        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          {/* <p>Scroll up</p> */}
          <About></About>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={2}
          style={{ backgroundColor: "#FFA384" }}
        />

        <ParallaxLayer
          offset={2}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          {/* <p>Scroll up</p> */}
          <Footer></Footer>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
