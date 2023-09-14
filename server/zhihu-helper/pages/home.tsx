import { useEffect, useState } from "react";
function HomePage() {
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/hello");
      const reader = response?.body?.getReader();
      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          let chunk = new TextDecoder("utf-8").decode(value);
          setText((pre) => pre + chunk);
          console.log("Received", chunk);
        }
      }
    };
    fetchData();
  }, []);
  return <>{text}</>;
}

export default HomePage;
