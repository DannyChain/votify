import { client } from "../services/dhive";

export const getUserInfo = async (username) => {
  try {
    const data = await client.database.call("get_accounts", [[username]]);

    return JSON.stringify(data[0]);
  } catch (error) {
    return error;
  }
};
