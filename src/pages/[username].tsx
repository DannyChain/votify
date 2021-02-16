import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import Voter from "../components/voter";
import Loading from "../components/loading";
import { client } from "../services/dhive";
import styles from "../styles/Home.module.css";

interface IUserProps {
  username: string;
  userdata: IUserData;
}

interface IUserData {
  posting_json_metadata: string;
}

const Witness: React.FC<IUserProps> = ({ username, userdata }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <Loading />;
  }

  return <Voter username={username} userdata={userdata} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { username: "dannychain" },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { username } = context.params;

  const userdata = await client.database.call("get_accounts", [[username]]);

  return {
    props: {
      username,
      userdata: userdata[0],
    },
  };
};

export default Witness;
