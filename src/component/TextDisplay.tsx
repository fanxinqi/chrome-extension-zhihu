import React, { useState, useEffect } from "react";
import copyText from "../utils/copytext";
// import TypeWriter from "./TyperWriter";

const text = `作为一个知乎高端玩家，我要明确表达的观点是：消费者有权对产品价格抱有不同的观点，同时，直播带货的主播也应尊重消费者的意见，不应对消费者的质疑和疑问进行反嘲。

首先，眉笔的价格是否贵，这是消费者的主观感受。79元对于有些人来说可能是小事一桩，但对于有些人来说可能是一笔不小的开销。消费者对价格的敏感度取决于他们的经济状况和消费观念，这是他们的权利，没有人有权对此进行嘲笑。

其次，李佳琦的言论似乎暗示了一个观念：那就是如果你买不起某样东西，那一定是因为你不够努力工作。这是一种极为片面的观念。人们的收入水平受到很多因素的影响，包括个人能力、教育背景、工作机会等等，并非只看个人是否努力工作。这样的言论容易引发社会不和谐，增加社会的阶级对立。

再者，直播带货的主播应当尊重消费者，谦虚接受消费者的质疑和建议。消费者的意见是对产品和服务最直接的反馈，而不是用来让主播嘲笑和攻击的工具。

总的来说，我认为李佳琦的这次言论是不妥的，他需要反思自己的言行，以更好的态度和方式面对消费者的意见和建议。`;

let i = 0;
let len = text.length - 3;

const copyIconNormal = chrome.runtime.getURL("img/copy.png");
const copyIconHover = chrome.runtime.getURL("img/copy-hover.png");
let cursorInterval: any;

const TextDisplay = () => {
  const [content, setContent] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [copyIcon, setCopyIcon] = useState(copyIconNormal);
  const [showCopy, setShowCopy] = useState(false);

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
    cursorInterval = setInterval(() => {
      setShowCursor((show) => !show);
    }, 500);

    return () => clearInterval(cursorInterval); // Cleanup on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
  useEffect(() => {
    let renderloading = false;
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

      // 结束
      if (i > len || i === len) {
        clearInterval(xxx);
        clearInterval(cursorInterval);
        setShowCopy(true);
      }
    }, 100);
  }, []);

  return (
    <div>
      <div className="alter-answer-content">
        {content}
        {showCursor && <span className="cursor">|</span>}
      </div>

      {showCopy ? <div className="alter-answer-copy-button">
        <span
          onMouseEnter={() => setCopyIcon(copyIconHover)}
          onMouseLeave={() => setCopyIcon(copyIconNormal)}
          onClick={() => {
            copyText(content);
          }}
        >
          <img src={copyIcon} />
        </span>
      </div> : null}

    </div>
  );
};

export default TextDisplay;
