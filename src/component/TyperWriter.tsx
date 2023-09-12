import React, { useState, useEffect } from "react";

const Typewriter = ({ text }: any) => {
  const [output, setOutput] = useState("");
  const [index, setIndex] = useState(0);
  console.log("typewrite text", text);
  console.log("typewrite index", index);
  useEffect(() => {
    console.log("typewrite useEffect text", text);
    console.log("typewrite useEffect index", index);
    if (index < text.length) {
    //   console.log("typewrite", index);
    //   setTimeout(() => {
        setOutput((output) => output + text.charAt(index));
        setIndex((index) => index + 1);
    //   }, 100);
    }
  }, [text]);

  return <h1>{output}</h1>;
};

export default Typewriter;
