import { v4 as uuid } from "uuid";
import {
  evaluateTransaction,
  submitTransaction,
} from "./Hyperledger.service.js";

/**
 * Get all assets.
 *
 * @returns
 */
async function get() {
  try {
    const assets = await evaluateTransaction("GetAllAssets");
    return JSON.parse(assets);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Get asset detail by id.
 *
 * @param id
 * @returns
 */
async function getById(id) {
  try {
    const asset = await evaluateTransaction("ReadAsset", id);
    return JSON.parse(asset);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Create new asset.
 *
 * @param assetObject
 * @returns
 */
async function create(assetObject) {
  try {
    // TODO change with params from frontend
    const id = uuid();

    await submitTransaction("CreateAsset", [
      id,
      assetObject.area,
      assetObject.location,
      assetObject.owner,
      assetObject.status,
    ]);

    const result = await evaluateTransaction("ReadAsset", id);

    return JSON.parse(result);
  } catch (error) {
    console.log(error);
    return error;
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

function prettyJSONString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

export default {
  get,
  getById,
  create,
  update,
  transfer,
};
