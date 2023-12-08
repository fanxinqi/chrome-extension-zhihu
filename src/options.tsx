import React from "react";
import { createRoot } from "react-dom/client";

const Options = () => {
  return (
    <>
      <button>去点赞</button>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
