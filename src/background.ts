function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "fetch") {
    fetch("http://127.0.0.1:3000/api/hello", {
      method: 'POST',
      body: JSON.stringify({
        prompt: message.title,
      }),
    }).then((response) => {
      const reader = response?.body?.getReader();
      (async () => {
        while (reader) {
          const { value, done } = await reader.read();
          if (done) break;
          let chunk = new TextDecoder("utf-8").decode(value);
          // console.log(chunk);
          // const chunkJSON = JSON.parse(chunk)
          // sendResponse(chunk);
          chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs: any
          ) {
            if (Array.isArray(tabs)) {
              chrome.tabs.sendMessage(tabs[0].id, {
                type: "chatgpt_respons_stream",
                chunk: chunk,
              });
            }
          });
        }
      })();
    });
  }
  // 需要在这里返回 true，表示你将异步地发送一个回应
  return true;
});
