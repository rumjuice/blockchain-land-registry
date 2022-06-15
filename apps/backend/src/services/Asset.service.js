import {
  evaluateTransaction,
  submitTransaction,
} from "./Hyperledger.service.js";

/**
 * Get all accounts.
 *
 * @returns
 */
async function get() {
  const assets = await evaluateTransaction("GetAllAssets");
  return assets;
}

/**
 * Create new asset.
 *
 * @param name
 * @returns
 */
async function create() {
  try {
    // TODO change with params from frontend
    await submitTransaction(
      "CreateAsset",
      "asset13",
      "yellow",
      "5",
      "Tom",
      "1300",
    );
    const result = await contract.evaluateTransaction("ReadAsset", "asset13");

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Update asset.
 *
 * @param name
 * @returns
 */
async function update() {
  try {
    // TODO change with params from frontend
    await submitTransaction(
      "UpdateAsset",
      "asset13",
      "yellow",
      "5",
      "Tom",
      "1300",
    );
    const result = await contract.evaluateTransaction("ReadAsset", "asset13");

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Transfer asset.
 *
 * @param name
 * @returns
 */
async function transfer() {
  try {
    // TODO change with params from frontend
    await submitTransaction("TransferAsset", "asset13", "Thomas");
    const result = await contract.evaluateTransaction("ReadAsset", "asset13");

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  get,
  create,
  update,
  transfer,
};
