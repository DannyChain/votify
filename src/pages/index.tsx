import { GetStaticProps } from "next";

import Voter from "../components/voter";

import { getWitnessInfo, getWitnessStatus } from "../services/hiveEngine";

import { IUserProps } from "../interfaces/general";
import { getUserInfo } from "../services/hive";

const Home: React.FC<IUserProps> = ({
  username,
  userdata,
  witnessInfo,
  witnessStatus,
}) => {
  return (
    <Voter
      username={username}
      userdata={userdata}
      witnessInfo={witnessInfo}
      witnessStatus={witnessStatus}
    />
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const username = "dannychain";

  const userdata = await getUserInfo(username);

  const witnessInfo = await getWitnessInfo(username);

  if (witnessInfo === undefined) {
    return {
      props: {
        username,
        userdata,
        witnessInfo: "",
        witnessStatus: "",
      },
    };
  }

  if (witnessInfo.enabled === false) {
    return {
      props: {
        username,
        userdata,
        witnessInfo,
        witnessStatus: "",
      },
    };
  }

  const witnessStatus = await getWitnessStatus(witnessInfo);

  return {
    props: {
      username,
      userdata,
      witnessInfo,
      witnessStatus,
    },
  };
};

export default Home;
