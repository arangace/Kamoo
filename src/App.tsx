import { useEffect, useRef, useState } from "react";
import runKaboom from "./runKaboom";
import kaboom from "kaboom";
import { setContext } from "./kaboomCtx";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";

function App() {
  const canvasRef = useRef(null);
  const [showHomeScreen, setshowHomeScreen] = useState(true);
  useEffect(() => {
    if (!showHomeScreen) {
      setContext(
        kaboom({
          global: false,
          canvas: canvasRef.current!,
        })
      );
      runKaboom();
    }
  }, [showHomeScreen]);

  const handlePlayClick = () => {
    setshowHomeScreen(false);
  };

  return (
    <div id="app">
      {showHomeScreen ? (
        <WelcomeScreen handlePlayClick={handlePlayClick} />
      ) : (
        <>
          {/* <div id="ui">
            <p className="note">Tap/Click around to move</p>
            <div id="textbox-container">
              <div id="textbox">
                <p id="dialogue" className="ui-text">
                  <button id="close" className="ui-close-btn">
                    Close
                  </button>
                </p>
              </div>
            </div>
          </div> */}
          <canvas ref={canvasRef} id="game"></canvas>
        </>
      )}
    </div>
  );
}

export default App;
