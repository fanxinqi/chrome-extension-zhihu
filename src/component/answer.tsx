import React, { useEffect, useState } from "react";
import TextDisplay from "./TextDisplay";

const Answer = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  return (
    <>
      <div className="alter-title">
        <img
          className="alter-title-icon"
          src={
            "https://gips2.baidu.com/it/u=1070828945,3304149431&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f150_150"
          }
        />
        <div className="alter-title-text">知乎小助手</div>
      </div>
      <div className="alter-answer">
        <TextDisplay />
      </div>
    </>
  );
};

export default Answer;
