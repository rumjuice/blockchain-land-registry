import ky from "ky";
import { GetAsset } from "../Types";

/**
 * Get all asset.
 *
 * @returns assets
 */
async function getAssets(): Promise<GetAsset[]> {
  return await ky.get(`http://localhost:8080/assets`).json();
}

export default getAssets;
