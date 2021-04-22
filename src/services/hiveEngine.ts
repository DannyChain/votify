export const getWitnessList = async () => {
  try {
    const data = await fetch(`https://votify.vercel.app/api/witnessList`);

    const json = await data.json();

    const paths = json.map((path) => {
      return {
        params: {
          username: path.account,
        },
      };
    });

    return paths;
  } catch (error) {
    return error;
  }
};

export const getWitnessInfo = async (witness) => {
  try {
    const data = await fetch(
      `https://votify.vercel.app/api/witnessInfo?witness=${witness}`
    );

    const json = await data.json();

    return json[0];
  } catch (error) {
    return error;
  }
};

export const getWitnessStatus = async (witnessInfo) => {
  try {
    const data = await fetch(
      `https://votify.vercel.app/api/witnessStatus?ip=${witnessInfo.IP}&port=${witnessInfo.RPCPort}`
    );

    const json = await data.json();

    return json;
  } catch (error) {
    return "error";
  }
};
