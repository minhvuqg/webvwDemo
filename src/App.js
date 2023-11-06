import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import PostMessage from "./util";

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
      ${!!window?.webkit?.messageHandlers?.[
        "LinkNowWithPermission"
      ]?.postMessage({})}`
    );
  };
  const submitFormLinkNowFull = () => {
    const postMessage = (funcName, message = {}) => {
      window?.webkit?.messageHandlers[funcName]?.postMessage(message);
    };
    postMessage("LinkNowWithPermission");
  };

  const openWebviewInWebviewBeforeReload = () => {
    window?.webkit?.messageHandlers?.["OpenWebviewInWebview"]?.postMessage({
      url: "https://www.google.com",
      forceReloadAfterClose: "true",
    });
    setMessage(`Open Webview Reload`);
  };
  
  const openWebviewInWebviewBeforeNormal = () => {
    window?.webkit?.messageHandlers?.["OpenWebviewInWebview"]?.postMessage({
      url: "https://www.google.com",
      forceReloadAfterClose: "false",
    });
    setMessage(`Open Webview`);
  };

  const closeWebview = () => {
    window?.webkit?.messageHandlers?.["CloseCurrentWebview"]?.postMessage({});
    setMessage(`Close Webview`);
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
        <div>
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
            Link Now Full Fn
          </button>
          <button
            style={{
              margin: 5,
              backgroundColor: "red",
              color: "white",
              padding: 12,
            }}
            onClick={openWebviewInWebviewBeforeReload}
          >
            Open web view reload after close
          </button>
          <button
            style={{
              margin: 5,
              backgroundColor: "purple",
              color: "white",
              padding: 12,
            }}
            onClick={openWebviewInWebviewBeforeNormal}
          >
            Open web view don't reload after close
          </button>
          <button
            style={{
              margin: 5,
              backgroundColor: "blue",
              color: "white",
              padding: 12,
            }}
            onClick={closeWebview}
          >
            Close Webview
          </button>
        </div>
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
          4
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
      <button
        style={{
          margin: 30,
          backgroundColor: "red",
          color: "white",
          padding: 12,
        }}
        onClick={() => setVis("ios")}
      >
        Apple Care
      </button>
      <button
        style={{
          margin: 30,
          backgroundColor: "red",
          color: "white",
          padding: 12,
        }}
        onClick={() => setVis("android")}
      >
        Google Fit
      </button>
    </>
  );
}

export default App;
