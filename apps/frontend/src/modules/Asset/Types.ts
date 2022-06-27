export enum AssetStatus {
  NOT_REGISTERED = "unregistered",
  REGISTERED = "registered",
  LOCKED = "hold",
}
export type Asset = {
  assetID: string;
  area: string;
  location: string;
  owner: string;
  status: AssetStatus | string;
};
export type GetAsset = {
  Key: string;
  Record: Asset;
};
export type Transfer = {
  id: string;
  owner: string;
};
