import { NowRequest, NowResponse } from "@vercel/node";

export default async (request: NowRequest, response: NowResponse) => {
  const { query } = request;

  const { ip, port } = query;

  if (!ip || !port) {
    response.status(400).send({
      code: 400,
      message:
        "Witness 'ip' and 'port' are both required query params on the URL.",
    });
  }

  const data = await fetch(`http://${query.ip}:${query.port}/blockchain`, {
    headers: {
      "content-type": "application/json",
    },
    body: '{"jsonrpc":"2.0","id":9,"method":"getStatus","params":{}}',
    method: "POST",
  });

  const json = (await data.json()).result;

  response.json(json);
};
