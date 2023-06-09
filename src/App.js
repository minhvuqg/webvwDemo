import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";

function App() {
  const submitForm = () => {
    var message = {
      authorize: document.getElementById("authorize").value,
    };
    if (!!window?.webkit?.messageHandlers?.observer?.postMessage(message)) {
      window.webkit.messageHandlers.observer.postMessage(message);
    }
  };
  const [vis, setVis] = useState("");
  if (vis === "ios") {
    return (
      <div>
        <button onClick={() => setVis("")}>back</button>

        <div>
          <label for="authorize">Authorize:</label>

          <input
            type="authorize"
            id="authorize"
            placeholder="Off"
            name="authorize"
          />
        </div>

        <button onClick={submitForm}>Click Call IOS HeathKit</button>
      </div>
    );
  }

  if (vis === "android") {
    return (
      <div>
        <button onClick={() => setVis("")}>back</button>
        <div>
          <label for="authorize">Authorize:</label>

          <input
            type="authorize"
            id="authorize"
            placeholder="Off"
            name="authorize"
          />
        </div>

        <button onClick={submitForm}>Click Call Android HeathKit</button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setVis("ios")}>Apple Care</button>;
      <button onClick={() => setVis("android")}>Google Care</button>;
    </>
  );
}

export default App;
