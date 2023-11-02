import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";

function App() {
  const submitFormObs = () => {
    var message = {
      authorize: document.getElementById("authorize").value,
    };
    if (!!window?.webkit?.messageHandlers?.observer?.postMessage(message)) {
      window.webkit.messageHandlers.observer.postMessage(message);
    }
    setMessage(
      `Obs
      ${!!window?.webkit?.messageHandlers?.observer
        ?.postMessage(message)
        .toString()}`
    );
  };
  const submitFormObsDirect = () => {
    window?.webkit?.messageHandlers?.observer?.postMessage({});
    setMessage(
      `Obs Direct status: 
      ${!!window?.webkit?.messageHandlers?.observer?.postMessage({})}`
    );
  };
  const submitFormLinkNow = () => {
    window?.webkit?.messageHandlers["LinkNowWithPermission"]?.postMessage({});
    setMessage(
      `Link status: ,
      ${!!window?.webkit?.messageHandlers["LinkNowWithPermission"]?.postMessage(
        {}
      )}`
    );
  };
  const submitFormLinkNowFull = () => {
    const postMessage = (funcName, message) => {
      let func;
      func = window?.webkit?.messageHandlers[funcName]?.postMessage;
      const payload = { ...message };
      if (typeof func === "function") {
        func(payload);
      }
      typeof func === "function" &&
        setMessage(`Link full status: , ${!!func(payload)}`);
    };
    postMessage("LinkNowWithPermission", {
      name: "LinkNowWithPermission",
      message: "LinkNowWithPermission",
    });
  };

  const submitFormLinkNowDirect = () => {
    window?.webkit?.messageHandlers?.LinkNowWithPermission?.postMessage({});
    setMessage(
      `Link full status: ,
      ${!!window?.webkit?.messageHandlers?.LinkNowWithPermission?.postMessage(
        {}
      )}`
    );
  };
  const [vis, setVis] = useState("");
  const [message, setMessage] = useState("");
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

        <button style={{ margin: 5 }} onClick={submitFormObs}>
          observer Fn
        </button>
        <button style={{ margin: 5 }} onClick={submitFormObsDirect}>
          observer Direct Fn
        </button>
        <button style={{ margin: 5 }} onClick={submitFormLinkNow}>
          Link Now Fn
        </button>
        <button style={{ margin: 5 }} onClick={submitFormLinkNowDirect}>
          Link Now Direct Fn
        </button>
        <button style={{ margin: 5 }} onClick={submitFormLinkNowFull}>
          Link Now Full Fn2
        </button>
        {message}
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

        {/* <button onClick={submitForm}>Click Call Android HeathKit</button> */}
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setVis("ios")}>Apple Care</button>;
      <button onClick={() => setVis("android")}>Google Fit</button>;
    </>
  );
}

export default App;
