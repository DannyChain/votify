import { useState } from "react";
import Head from "next/head";

import { requestCustomJson } from "../services/hiveKeychain";
import styles from "../styles/Home.module.css";

interface IUserProps {
  username: string;
  userdata: IUserData;
}

interface IUserData {
  posting_json_metadata: string;
}

interface IUserProfile {
  name: string;
  about: string;
  profile_image: string;
  witness_owner?: string;
}

const Voter: React.FC<IUserProps> = ({ username, userdata }) => {
  const [userProfile, setUserProfile] = useState<IUserProfile>({
    name: "",
    about: "",
    profile_image: "",
    witness_owner: "",
  } as IUserProfile);

  if (userProfile.name === "") {
    const postingJsonMetadata = userdata.posting_json_metadata;
    const { profile } = JSON.parse(postingJsonMetadata);
    setUserProfile(profile);
  }

  const owners = userProfile.witness_owner?.split(",");

  const customJson = JSON.stringify({
    contractName: "witnesses",
    contractAction: "approve",
    contractPayload: { witness: username },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Vote on @{username || "dannychain"} for Hive-Engine Witness
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img
          src={userProfile.profile_image}
          width="200px"
          height="200px"
          style={{ borderRadius: "50%" }}
        />

        <br />

        <h1 className={styles.title}>
          Vote for{" "}
          <a
            href={`https://peakd.com/@${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {username || "dannychain"}
          </a>
        </h1>

        <div className={styles.center}>
          {userProfile.witness_owner ? (
            <span className={styles.small}>
              Witness by
              {owners.map((owner) => {
                return (
                  <span key={owner}>
                    {" "}
                    <a
                      href={`https://peakd.com/@${owner}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {owner}
                    </a>
                  </span>
                );
              })}
            </span>
          ) : (
            <div />
          )}

          <p className={styles.description}>{userProfile.about}</p>

          {/*<br />
          <br />
          <code className={styles.code}>
            Last Block: 51379809 | Weight: XXX WORKERBEE | Version: 1.24.2
          </code>*/}
        </div>

        <input
          id="sign_username"
          className={styles.input}
          placeholder="Your Username"
        />

        <h2>Vote using:</h2>

        <span className={styles.center}>
          <button
            className={styles.card}
            onClick={async () => {
              await requestCustomJson($("#sign_username").val(), username);
            }}
          >
            Hive Keychain
          </button>
          <a
            href={`https://hivesigner.com/sign/custom-json?authority=active&id=ssc-mainnet-hive&json=${encodeURIComponent(
              customJson
            )}&redirect_uri=https://he-voter.vercel.app/${username}`}
          >
            <button className={styles.card}>Hivesigner</button>
          </a>
        </span>
      </main>

      <footer className={styles.footer}>
        Created by
        <a
          href="https://peakd.com/@dannychain"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong> DannyChain </strong>
        </a>
        and heavly inspired on{" "}
        <a
          href="https://peakd.com/@cadawg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong> CADawg</strong>
        </a>
        's tool for{" "}
        <a
          href="https://vote.hive.uno"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong> Hive Witnesses</strong>
        </a>
        . <br /> Please consider voting for my Hive-Engine Witness if you like
        this tool:{" "}
        <a href="/">
          <strong> @DannyChain</strong>
        </a>
      </footer>
    </div>
  );
};

export default Voter;
