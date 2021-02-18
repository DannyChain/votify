import { client } from "../services/dhive";

export const getUserInfo = async (username) => {
  try {
    let userdata = {
      name: "",
      about: "",
      witness_owner: "",
    };

    const data = await client.database.call("get_accounts", [[username]]);
    const postingJsonMetadata = data[0].posting_json_metadata;

    if (postingJsonMetadata !== "") {
      const { profile } = JSON.parse(postingJsonMetadata);
      userdata = {
        name: profile.name ?? "",
        about: profile.about ?? "",
        witness_owner: profile.witness_owner ?? "",
      };
    }

    return userdata;
  } catch (error) {
    return error;
  }
};
