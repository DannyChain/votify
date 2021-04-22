import { NowRequest, NowResponse } from "@vercel/node";

export default async (request: NowRequest, response: NowResponse) => {
  const data = await fetch(
    `https://api.hive-engine.com/rpc/contracts`,
    {
      headers: {
        "content-type": "application/json",
      },
      body:
        '{"jsonrpc":"2.0","method":"find","params":{"contract":"witnesses","table":"witnesses","query":{}},"id": 1}',
      method: "POST",
    }
  );

  const json = (await data.json()).result;

  response.json(json);
};
