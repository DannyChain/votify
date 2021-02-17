export interface IUserProps {
  username: string;
  userdata: IUserData;
  witnessInfo: IWitnessInfo;
  witnessStatus: IWitnessStatus;
}

export interface IUserData {
  posting_json_metadata: string;
}

export interface IUserProfile {
  name: string;
  about: string;
  witness_owner?: string;
}

export interface IWitnessInfo {
  approvalWeight: IApprovalWeight;
  IP: string;
  RPCPort: string;
  P2PPort: string;
  enabled: boolean;
  missedRounds: string;
  verifiedRounds: string;
  lastRoundVerified: string;
  lastBlockVerified: string;
}

export interface IApprovalWeight {
  $numberDecimal: string;
}

export interface IWitnessStatus {
  lastBlockNumber: string;
  lastBlockRefHiveBlockNumber: string;
  lastParsedHiveBlockNumber: string;
  SSCnodeVersion: string;
}
