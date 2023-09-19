// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});
function stringToUint8Array(str: string) {
  var arr = [];
  for (var i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }

  var tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Set the appropriate headers for Server Sent Events - SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");

    // extract the prompt
    const { prompt } = JSON.parse(req.body);

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      stream: true,
    });

    for await (const part of stream) {
      console.log(JSON.stringify(part.choices[0]));
      const content = part.choices[0]?.delta?.content;
      if (content) {
        res.write(part.choices[0]?.delta?.content);
      } else if (part.choices[0]?.finish_reason === "stop") {
        res.write('fanxinqi_done');
      }
    }
    // res.write(stringToUint8Array("fanxinqi_done"));

    req.on("close", () => {
      res.end();
    });
  } else {
    // Handle other HTTP methods or return an appropriate error response
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
