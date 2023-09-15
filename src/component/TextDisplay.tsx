import React, { useState, useEffect } from "react";
import copyText from "../utils/copytext";
import useEffectOnce from "../utils/useEffectOnce";
const copyIconNormal = chrome.runtime.getURL("img/copy.png");
const copyIconHover = chrome.runtime.getURL("img/copy-hover.png");
let cursorInterval: any;

const TextDisplay = () => {
  const [content, setContent] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [copyIcon, setCopyIcon] = useState(copyIconNormal);
  const [showCopy, setShowCopy] = useState(false);

  useEffectOnce(() => {
    cursorInterval = setInterval(() => {
      setShowCursor((show) => !show);
    }, 500);

    chrome.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      if (message && message.type === "chatgpt_respons_stream") {
        // console.log(message.chunk);
        // const chunkJSON = JSON.parse(message.chunk);
        // console.log(chunkJSON);

        // stream end
        if (message.chunk && message.chunk.includes("fanxinqi_done")) {
          console.log("stream end");
          clearInterval(cursorInterval);
          setShowCopy(true);
        } else if (message.chunk) {
          setContent((pre) => pre + message.chunk);
        }
      }
    });

    return () => clearInterval(cursorInterval); // Cleanup on component unmount
  }); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div>
      {showCopy ? (
        <div className="alter-answer-copy-button">
          <span
            onMouseEnter={() => setCopyIcon(copyIconHover)}
            onMouseLeave={() => setCopyIcon(copyIconNormal)}
            onClick={() => {
              copyText(content);
            }}
          >
            <img src={copyIcon} />
          </span>
        </div>
      ) : null}
      <div className="alter-answer-content">
        {content}
        {showCursor && <span className="cursor">|</span>}
      </div>

      {showCopy ? (
        <div className="alter-answer-copy-button">
          <span
            onMouseEnter={() => setCopyIcon(copyIconHover)}
            onMouseLeave={() => setCopyIcon(copyIconNormal)}
            onClick={() => {
              copyText(content);
            }}
          >
            <img src={copyIcon} />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default TextDisplay;
