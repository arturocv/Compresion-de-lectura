import React, { useEffect, createRef } from "react";
import "./App.css";

import lottie from "lottie-web";
import animation from "./Animaciones/animacionLogoCardinal.json";

const App = () => {
  let animationContainer = createRef();


  lottie.loadAnimation({
	container: animationContainer.current, // current instance of our container!
	animationData: animation, // animation file!
	renderer: "svg",
	loop: false,
	autoplay: true
  });

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animation
    });
    return () => anim.destroy(); // optional clean up for unmounting
  }, []);

  return (
    <div className="App">
        <div className="animation-container" ref={animationContainer} />
        <div>Bodymovin Animations in React</div>
    </div>
  );
};

export default App;