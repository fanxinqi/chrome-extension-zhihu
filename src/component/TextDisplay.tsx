import React, { useState, useEffect } from "react";
import copyText from "../utils/copytext";
// import TypeWriter from "./TyperWriter";

const text = `作为一名知乎高端玩家，我认为这个事情需要从多个角度去看待。首先，李佳琦的言论确实有些过激，这种"努力工作就能买得起"的观点忽略了很多人的生活现状和困难，显得不够尊重他人，这也引发了网友对他的质疑和批评。

其次，李佳琦在后续直播中对此事进行了解释，并表示会有更便宜的眉笔供大家选择。这种积极的回应态度值得肯定，但是是否能够挽回部分观众的好感，还需要时间来看。

再次，李佳琦的言论虽然引起了争议，但是他的销售成绩和影响力是不容忽视的。他的话语权和影响力在一定程度上反映了他的市场地位和实力。

至于是否忘本，我认为这需要看李佳琦接下来的行动和言论。如果他能够吸取此次事件的教训，更加尊重消费者，那么就不能算是忘本。但如果他继续维持这种态度，那就可能会被更多的人认为是忘本。

最后，这次事件也提醒我们，无论是商家还是消费者，都应该保持一种理性和尊重的态度，才能让市场环境更加和谐。`;

let i = 0;
let len = text.length - 3;

const copyIconNormal = chrome.runtime.getURL("img/copy.png");
const copyIconHover = chrome.runtime.getURL("img/copy-hover.png");

const TextDisplay = () => {
  const [content, setContent] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [copyIcon, setCopyIcon] = useState(copyIconNormal);
  useEffect(() => {
    // setInterval(() => {
    //   const newText = content + "内容";
    //   setContent(newText);
    // }, 500);
  });

  useEffect(() => {
    // Fetch data from OpenAPI
    // fetch('YOUR_OPENAPI_ENDPOINT')
    //     .then(response => response.json())
    //     .then(data => {
    //         setContent(data.content);
    //     })
    //     .catch(error => {
    //         console.log('Error:', error);
    //         setContent('Error loading content.');
    //     });

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor((show) => !show);
    }, 500);

    return () => clearInterval(cursorInterval); // Cleanup on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
  useEffect(() => {
    const xxx = setInterval(() => {
      console.log(i);
      if (i == 0) {
        setContent((content) => {
          const tx = text[i];
          i++;
          return tx;
        });
      }
      if (i < len) {
        setContent((content) => {
          const tx = text[i];
          i++;
          return content + tx;
        });
      }

      if (i > len || i === len) {
        clearInterval(xxx);
      }
    }, 200);
  }, []);
  return (
    <div>
      {content}
      {showCursor && <span className="cursor">|</span>}

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
    </div>
  );
};

export default TextDisplay;
