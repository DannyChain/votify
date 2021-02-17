import { GetStaticProps } from "next";

import Voter from "../components/voter";
import { client } from "../services/dhive";


import { IUserProps } from "../interfaces/general";

const Home: React.FC<IUserProps> = ({ username, userdata }) => {
  return <Voter username={username} userdata={userdata} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const username = "dannychain";

  const userdata = await client.database.call("get_accounts", [[username]]);

  return {
    props: {
      username,
      userdata: userdata[0],
    },
  };
};

export default Home;
