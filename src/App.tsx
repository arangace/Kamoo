import { useEffect, useRef } from "react";
import runKaboom from "./runKaboom";
import kaboom from "kaboom";
import { setContext } from "./kaboomCtx";

function App() {
  const canvasRef = useRef(null);
  useEffect(() => {
    setContext(
      kaboom({
        global: false,
        canvas: canvasRef.current!,
      })
    );
    runKaboom();
  }, []);

  return (
    <div id="app">
      <div id="ui">
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
      </div>
      <canvas ref={canvasRef} id="game"></canvas>
    </div>
  );
}

export default App;
