import React, { useEffect, useMemo, useState } from "react";
import useEffectOnce from "../utils/useEffectOnce";
import TextDisplay from "./TextDisplay";
const iconUrl = "https://i9.taou.com/maimai/p/34715/1782_6_8JfCNQpHxkJxn6";

const Answer = () => {
  const [showAiBox, setAiBox] = useState(false);
  const [aiBoxText, setAiBoxText] = useState("打开滴答AI助手");
  useEffectOnce(() => {
    const title = (document.querySelector(
      ".QuestionHeader-title"
    ) as any)?.innerText;
    if (title) {
      chrome.runtime.sendMessage({ type: "fetch", title: title }, function (
        response
      ) {
        console.log(response); // "test"
      });
    }
  });

  const toggleAiBox = () => {
    setAiBox((pre) => !pre);
    setAiBoxText((pre) => {
      if (pre === "打开滴答AI助手") {
        return "关闭滴答AI助手";
      } else {
        return "打开滴答AI助手";
      }
    });
  };

  return (
    <>
      <div className="alter-ball-box">
        <div className="alter-ball" onClick={toggleAiBox}>
          <div className="alter-ball-text">{aiBoxText}</div>
          {/* <div className="alter-ball-version">gpt4.0</div> */}
        </div>
      </div>
      {showAiBox && (
        <div className="alter-ai-box">
          <div className="alter-title">
            <img
              className="alter-title-icon"
              src={"https://i9.taou.com/maimai/p/34715/1782_6_8JfCNQpHxkJxn6"}
            />
            <div className="alter-title-text">知乎小助手</div>
          </div>
          <div className="alter-answer">
            <TextDisplay />
          </div>
        </div>
      )}
    </>
  );
};

export default Answer;
