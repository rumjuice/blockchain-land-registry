import ky from "ky";
import { Asset } from "../Types";

/**
 * Get all asset.
 *
 * @returns assets
 */
async function getAssets(): Promise<Asset[]> {
  return await ky.get(`http://localhost:8080/assets`).json();
}

export default getAssets;
