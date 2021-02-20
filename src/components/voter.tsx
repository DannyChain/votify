import Head from "next/head";

import { requestCustomJson } from "../services/hiveKeychain";
import styles from "../styles/Home.module.css";

import { IUserProps } from "../interfaces/general";

const Voter: React.FC<IUserProps> = ({
  username,
  userdata,
  witnessInfo,
  witnessStatus,
}) => {
  const owners = userdata.witness_owner?.split(",");

  const customJson = JSON.stringify({
    contractName: "witnesses",
    contractAction: "approve",
    contractPayload: { witness: username },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Vote on @{username} for Hive-Engine Witness</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img
          src={`https://${
            process.env.HIVE_IMAGE_PROXY || "images.ecency.com"
          }/u/${username}/avatar/large`}
          width="200px"
          height="200px"
          style={{ borderRadius: "50%" }}
          className={styles.image}
        />

        <h1 className={styles.title}>
          Vote for{" "}
          <a
            href={`https://hivel.ink/@${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {username}
          </a>
        </h1>

        {witnessInfo.enabled ? (
          <code className={styles.code}>
            <strong>Node:</strong> {witnessInfo.IP}:{witnessInfo.RPCPort} |{" "}
            <strong>Approval Weight:</strong>{" "}
            {witnessInfo.approvalWeight.$numberDecimal} WORKERBEE |{" "}
            <strong>Enabled:</strong>{" "}
            <input type="checkbox" readOnly checked={witnessInfo.enabled} />{" "}
            <br />
            <strong>Last Block:</strong>{" "}
            <a
              href={`https://he.dtools.dev/b/${witnessInfo.lastBlockVerified}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {witnessInfo.lastBlockVerified}
            </a>{" "}
            | <strong>Last Round:</strong> {witnessInfo.lastRoundVerified} |{" "}
            <strong>Missed Rounds:</strong> {witnessInfo.missedRounds} |{" "}
            <strong>Version:</strong> {witnessStatus.SSCnodeVersion}
          </code>
        ) : (
          <div>
            {witnessInfo ? (
              <code className={styles.code}>
                <strong>Witness currently disabled.</strong>
              </code>
            ) : (
              ""
            )}
          </div>
        )}

        <div className={styles.center}>
          {userdata.witness_owner && witnessInfo ? (
            <span className={styles.small}>
              Witness by
              {owners.map((owner) => {
                return (
                  <span key={owner}>
                    {" "}
                    <a
                      href={`https://hivel.ink/@${owner}`}
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
          <p className={styles.description}>{userdata.about}</p>
        </div>

        {witnessInfo ? (
          <span className={styles.center}>
            <input
              id="sign_username"
              className={styles.input}
              placeholder="Your Username"
            />

            <h2 className={styles.h2}>Vote using:</h2>

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
              )}&redirect_uri=https://votify.now.sh/${username}`}
            >
              <button className={styles.card}>Hivesigner</button>
            </a>
          </span>
        ) : (
          <span className={styles.center}>
            <p className={styles.code}>
              You can't vote for this account as they are not a Hive-Engine
              Witness!
            </p>
          </span>
        )}
      </main>

      <footer className={styles.footer}>
        Created by
        <a
          href="https://hivel.ink/@dannychain"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong> DannyChain </strong>
        </a>
        and heavily inspired on{" "}
        <a
          href="https://hivel.ink/@cadawg"
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
