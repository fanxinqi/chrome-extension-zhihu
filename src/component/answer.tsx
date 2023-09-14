import React, { useEffect, useState } from "react";
import useEffectOnce from "../utils/useEffectOnce";
import TextDisplay from "./TextDisplay";

const Answer = () => {
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
