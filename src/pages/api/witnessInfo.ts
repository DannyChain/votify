import { NowRequest, NowResponse } from "@vercel/node";

export default async (request: NowRequest, response: NowResponse) => {
  const { query } = request;

  const { witness } = query;

  if (!witness) {
    response.status(400).send({
      code: 400,
      message: "The query param 'witness' is required on the URL.",
    });
  }

  const data = await fetch(
    `https://api.hive-engine.com/rpc/contracts`,
    {
      headers: {
        "content-type": "application/json",
      },
      body:
        '{"jsonrpc":"2.0","method":"find","params":{"contract":"witnesses","table":"witnesses","query":{"account":"' +
        witness +
        '"}},"id": 1}',
      method: "POST",
    }
  );

  const json = (await data.json()).result;

  response.json(json);
};
