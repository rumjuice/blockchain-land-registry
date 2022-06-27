import ky from "ky";

/**
 * Release asset.
 *
 */
async function releaseAsset(id: string): Promise<void> {
  await ky.post(`http://localhost:8080/unhold/${id}`).json();
}

export default releaseAsset;
