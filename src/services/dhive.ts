import { Client } from "@hiveio/dhive";

const opts = {
  addressPrefix: "STM",
  chainId: "beeab0de00000000000000000000000000000000000000000000000000000000",
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
