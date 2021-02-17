import { NowRequest, NowResponse } from "@vercel/node";

export default async (request: NowRequest, response: NowResponse) => {
  const { query } = request;

  const { witness } = query;

  const data = await fetch(
    `${process.env.WITNESS_URL_PROTOCOL || "http"}://${
      process.env.WITNESS_NODE_IP || "35.188.146.63"
    }:${process.env.WITNESS_NODE_PORT || "5000"}/contracts`,
    {
      headers: {
        "content-type": "application/json",
      },
      body:
        '{"jsonrpc":"2.0","method":"find","params":{"contract":"witnesses","table":"witnesses","query":{}},"id": 9}',
      method: "POST",
    }
  );

  const json = (await data.json()).result;

  response.json(json);
};
