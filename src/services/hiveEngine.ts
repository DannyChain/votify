const node = "http://35.188.146.63:5000";

export const findWitness = async (witness) => {
  const res = await fetch(`${node}/contracts`, {
    headers: {
      "content-type": "application/json",
    },
    body:
      '{"jsonrpc":"2.0","method":"find","params":{"contract":"witnesses","table":"witnesses","query":{"account":"' +
      witness +
      '"}},"id": 9}',
    method: "POST",
  });

  const response = (await res.json()).result;

  return response[0];
};

export const getVersion = async (IP, RPCPort) => {
  const res = await fetch(`http://${IP}:${RPCPort}/blockchain`, {
    headers: {
      "content-type": "application/json",
    },
    body: '{"jsonrpc":"2.0","id":10,"method":"getStatus","params":{}}',
    method: "POST",
  });

  const response = (await res.json()).result;

  return response;
};

export const outputData = async () => {};

export const main = async () => {};
