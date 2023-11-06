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

  const openWebviewInWebviewBefore = () => {
    window?.webkit?.messageHandlers?.["OpenWebviewInWebview"]?.postMessage({
      url: "https://www.google.com",
    });
    setMessage(`Open Webview before`);
  };

  const openWebviewInWebview0 = () => {
    window?.webkit?.messageHandlers?.["OpenWebviewInWebview"]?.postMessage({
      url: "https://www.google.com",
      onCloseWebView: () => setMessage(`Close Webview after`),
    });

    setMessage(`Open Webview after 0`);
  };
  const openWebviewInWebview1 = () => {
    window?.webkit?.messageHandlers?.["OpenWebviewInWebview"]?.postMessage({
      url: "https://www.google.com",
      onCloseWebView: () =>
        PostMessage.sendMessage("OpenWebviewInWebview", "abc").then((data) =>
          setMessage(data)
        ),
    });
    setMessage(`Open Webview after 1`);
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
            onClick={openWebviewInWebviewBefore}
          >
            Open web view before
          </button>
          <button
            style={{
              margin: 5,
              backgroundColor: "red",
              color: "white",
              padding: 12,
            }}
            onClick={openWebviewInWebview0}
          >
            Open web view after 0
          </button>
          <button
            style={{
              margin: 5,
              backgroundColor: "red",
              color: "white",
              padding: 12,
            }}
            onClick={openWebviewInWebview1}
          >
            Open web view after 1
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
