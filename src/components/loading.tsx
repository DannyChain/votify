import Head from "next/head";

import styles from "../styles/Home.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Loading...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.title}>Loading...</p>
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
        and heavly inspired on{" "}
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

export default Loading;
