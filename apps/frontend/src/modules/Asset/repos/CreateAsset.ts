import ky from "ky";
import { Asset } from "../Types";

/**
 * Create asset.
 *
 */
async function createAsset(data: Asset): Promise<void> {
  await ky.post(`http://localhost:8080/assets`, { json: data }).json();
}

export default createAsset;
