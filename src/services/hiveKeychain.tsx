import { keychain } from "@hiveio/keychain";

export interface keychainResponseData {
  method: string;
  type: string;
  username: string;
}

export interface keychainResponse {
  success: boolean;
  error: string;
  message: string;
  msg: string;
  data: keychainResponseData;
}

export async function requestCustomJson(
  account: string | number | string[],
  witness: string | number | string[]
): Promise<keychainResponse> {
  const response = await keychain(
    window,
    "requestCustomJson",
    account,
    "ssc-mainnet-hive",
    "Active",
    JSON.stringify({
      contractName: "witnesses",
      contractAction: "approve",
      contractPayload: { witness: witness },
    }),
    ""
  );

  return response;
}
