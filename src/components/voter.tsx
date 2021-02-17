import { useState } from "react";
import Head from "next/head";

import { findWitness, getVersion } from "../services/hiveEngine";
import { requestCustomJson } from "../services/hiveKeychain";
import styles from "../styles/Home.module.css";

import { IUserProps, IUserProfile } from "../interfaces/general";

const Voter: React.FC<IUserProps> = ({ username, userdata }) => {
  const [userProfile, setUserProfile] = useState<IUserProfile>({
    name: "",
    about: "",
    witness_owner: "",
  } as IUserProfile);

  const [witnessInfo, setWitnessInfo] = useState<IWitnessInfo>({
    ip: "",
    rpcPort: 0,
    approvalWeight: "",
    enabled: false,
    lastBlockVerified: 0,
    lastRoundVerified: 0,
    missedRounds: 0,
    version: "",
    isWitness: false,
  } as IWitnessInfo);

  if (userProfile.name === "") {
    const postingJsonMetadata = userdata.posting_json_metadata;
    const { profile } = JSON.parse(postingJsonMetadata);
    setUserProfile(profile);
  }

  if (witnessInfo.ip === "") {
    findWitness(username).then((witness) => {
      if (witness === undefined) {
        return;
      }

      const {
        IP,
        approvalWeight: { $numberDecimal },
        enabled,
        lastBlockVerified,
        lastRoundVerified,
        missedRounds,
        RPCPort,
      } = witness;

      if (enabled) {
        getVersion(IP, RPCPort).then((nodeInfo) => {
          const { SSCnodeVersion } = nodeInfo;

          setWitnessInfo({
            ip: IP,
            approvalWeight: $numberDecimal,
            enabled,
            lastBlockVerified,
            lastRoundVerified,
            missedRounds,
            rpcPort: RPCPort,
            version: SSCnodeVersion,
            isWitness: true,
          });
        });
      } else {
        setWitnessInfo({
          ip: IP,
          approvalWeight: $numberDecimal,
          enabled,
          lastBlockVerified,
          lastRoundVerified,
          missedRounds,
          isWitness: true,
          rpcPort: RPCPort,
        });
      }
    });
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
          src={`https://${
            process.env.HIVE_IMAGE_PROXY || "images.ecency.com"
          }/u/${username}/avatar/large`}
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

        {witnessInfo.enabled ? (
          <code className={styles.code}>
            <strong>Node:</strong> {witnessInfo.ip}:{witnessInfo.rpcPort} |{" "}
            <strong>Approval Weight:</strong> {witnessInfo.approvalWeight}{" "}
            WORKERBEE | <strong>Enabled:</strong>{" "}
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
            <strong>Version:</strong> {witnessInfo.version}
          </code>
        ) : (
          <code className={styles.code}>
            <strong>Witness currently disabled.</strong>
          </code>
        )}

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
        </div>

        {witnessInfo.isWitness ? (
          <span className={styles.center}>
            <input
              id="sign_username"
              className={styles.input}
              placeholder="Your Username"
            />

            <h2>Vote using:</h2>

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
              )}&redirect_uri=https://${
                process.env.VOTER_WEBSITE_URL || "he-voter.vercel.app"
              }/${username}`}
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
