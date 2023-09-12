import React, { useEffect, useState } from "react";
import Answer from "./component/answer";
import { createRoot } from "react-dom/client";

function observe(observeSelector: string, firstCallBack?: Function) {
  const observeCallbackHistory: any = {};
  function changeCallBack(mutationsList: any) {
    // console.log(mutationsList);
    // mutationsList参数是个MutationRecord对象数组，描述了每个发生的变化
    mutationsList?.forEach(function (mutation: any) {
      var target = mutation.target;
      if (!target) {
        return;
      }
      if (target?.querySelector && target?.querySelector(observeSelector)) {
        if (
          observeCallbackHistory[observeSelector] &&
          observeCallbackHistory[observeSelector] > 0
        ) {
          observeCallbackHistory[observeSelector] + 1;
        } else {
          observeCallbackHistory[observeSelector] = 1;
          firstCallBack &&
            firstCallBack(target.querySelector(observeSelector), mutation);
        }
      }

      // 变化的类型
      // switch (mutation.type) {
      //   case "characterData":
      //     // 文本内容变化
      //     target.render();
      //     break;
      // case "attributes":
      //   // rows属性值发生了变化
      //   target.render();
      //   break;
      // }
    });
  }
  const observer = new MutationObserver(changeCallBack);

  // 开始观察ell元素并制定观察内容
  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    characterData: true,
  });
}

function fireContentLoadedEvent() {
  // const observeSelector =
  //   "#root > div > main > div > form > div > div:nth-child(2)";
  const observeSelector = "#AnswerFormPortalContainer";
  observe(observeSelector, (target: any, mutation: any) => {
    console.log(target);
    (document.querySelector(observeSelector) as any).style.position = 'relative';
    const insertDom = document.createElement("div");
    insertDom.className = "alter-zhihu-aigc-wrap";
    const root = createRoot(insertDom);
    root.render(
      <React.StrictMode>
        <Answer />
      </React.StrictMode>
    );
    target.appendChild(insertDom);
  });
}
// 绑定这个事件需要在 manifest 中设定 "run_at": "document_start"
document.addEventListener("DOMContentLoaded", fireContentLoadedEvent, false);
