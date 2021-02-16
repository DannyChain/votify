import { useState } from "react";
import Head from "next/head";

import { client } from "../services/dhive";
import { requestCustomJson } from "../services/hiveKeychain";
import styles from "../styles/Home.module.css";

interface Voter {
  username: string | string[];
}

interface IUserProfile {
  name: string;
  about: string;
  profile_image: string;
}

const getUserData = async (user) => {
  if (user) {
    const data = await client.database.call("get_accounts", [[user]]);
    return data[0];
  }
};

const Voter: React.FC<Voter> = ({ username }) => {
  const [userProfile, setUserProfile] = useState<IUserProfile>(
    {} as IUserProfile
  );

  if (username) {
    getUserData(username).then((userdata) => {
      if (userdata) {
        const postingJsonMetadata = userdata.posting_json_metadata;
        const { profile } = JSON.parse(postingJsonMetadata);
        return setUserProfile(profile);
      }
    });
  }

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
          width="256px"
          height="256px"
          style={{ borderRadius: "50%" }}
        />

        <br />

        <h1 className={styles.title}>
          Vote for{" "}
          <a href="https://nextjs.org">{userProfile.name || "DannyChain"}</a>
        </h1>

        <p className={styles.description}>
          {userProfile.about}
          {/*<br />
          <br />
          <code className={styles.code}>
            Last Block: 51379809 | Weight: XXX WORKERBEE | Version: 1.24.2
          </code>*/}
        </p>

        <input
          id="sign_username"
          className={styles.input}
          style={{ width: "50%" }}
          placeholder="Your Username"
        />

        <h2>Vote using:</h2>

        <button
          className={styles.card}
          onClick={async () => {
            const request = await requestCustomJson(
              $("#sign_username").val(),
              username
            );
          }}
        >
          <h3>Hive Keychain</h3>
        </button>
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
