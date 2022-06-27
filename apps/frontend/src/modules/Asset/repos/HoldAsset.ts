import ky from "ky";

/**
 * Hold asset.
 *
 */
async function holdAsset(id: string): Promise<void> {
  await ky.post(`http://localhost:8080/hold/${id}`).json();
}

export default holdAsset;
