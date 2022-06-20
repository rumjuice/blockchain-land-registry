export enum AssetStatus {
  NOT_REGISTERED = "Not Registered",
  REGISTERED = "Registered",
  LOCKED = "Locked",
}
export type Asset = {
  id: string;
  area: number;
  location: string;
  owner: string;
  status: AssetStatus | string;
};
export type Transfer = {
  id: string;
  owner: string;
};
