import { Intro } from "../../intro";
import { About } from "../../about";
import { Footer } from "../../footer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "../../../styles/main.css";
// import icon1 from "../../../assets/images/icons.webp";
import icon2 from "../../../assets/images/icons1.png";

export const Containers = () => {
  return (
    <div>
      <Parallax
        pages={3}
        style={{
          top: "0",
          left: "0",
          backgroundImage: `url(${icon2})`,
          // backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // backgroundSize: "cover",
          backgroundAttachment: "local",
        }}
      >
        <ParallaxLayer
          offset={0}
          speed={1.2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <p>Scroll down</p> */}
          <Intro style={{ scrollMarginBlock: 0 }} id="intro"></Intro>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={2}
          style={{ backgroundColor: "#74BDCB" }}
        />

        <ParallaxLayer
          offset={1}
          speed={1.2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            // backgroundColor: "#74BDCB",
          }}
        >
          {/* <p>Scroll up</p> */}
          <About style={{ scrollMarginBlock: "90px" }} id="about"></About>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={2}
          style={{ backgroundColor: "#FFA384" }}
        />

        <ParallaxLayer
          offset={2}
          speed={1.2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            // backgroundColor: "#FFA384",
          }}
        >
          {/* <p>Scroll up</p> */}
          <Footer style={{ scrollMarginBlock: "110px" }} id="footer"></Footer>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
