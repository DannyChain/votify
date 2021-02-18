import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import Voter from "../components/voter";
import Loading from "../components/loading";

import { getUserInfo } from "../services/hive";
import {
  getWitnessInfo,
  getWitnessStatus,
  getWitnessList,
} from "../services/hiveEngine";

import { IUserProps } from "../interfaces/general";

const Witness: React.FC<IUserProps> = ({
  username,
  userdata,
  witnessInfo,
  witnessStatus,
}) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <Loading />;
  }

  return (
    <Voter
      username={username}
      userdata={userdata}
      witnessInfo={witnessInfo}
      witnessStatus={witnessStatus}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getWitnessList();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { username } = context.params;

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

export default Witness;
