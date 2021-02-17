import { Client } from "@hiveio/dhive";

const opts = {
  addressPrefix: process.env.HIVE_ADDRESS_PREFIX || "STM",
  chainId:
    process.env.HIVE_CHAIN_ID ||
    "beeab0de00000000000000000000000000000000000000000000000000000000",
};

export const client = new Client(
  [
    "https://hive.roelandp.nl",
    "https://api.deathwing.me",
    "https://hived.emre.sh",
    "https://api.hive.blog",
  ],
  opts
);
