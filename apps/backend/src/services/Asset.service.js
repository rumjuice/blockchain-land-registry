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
    throw new Error(error);
  }
}

/**
 * Transfer asset.
 *
 * @param name
 * @returns
 */
async function transfer(transferObject) {
  try {
    // TODO change with params from frontend
    await submitTransaction(
      "TransferAsset",
      transferObject.id,
      transferObject.owner,
    );
    const result = await contract.evaluateTransaction("ReadAsset", id);

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * hold asset.
 *
 * @param name
 * @returns
 */
async function hold(holdData) {
  try {
    // TODO change with params from frontend
    await submitTransaction("HoldAsset", holdData.id);
    const result = await contract.evaluateTransaction("ReadAsset", holdData.id);

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Unhold asset.
 *
 * @param name
 * @returns
 */
async function unhold(unholdData) {
  try {
    // TODO change with params from frontend
    await submitTransaction("UnHoldAsset", unholdData.id);
    const result = await contract.evaluateTransaction(
      "ReadAsset",
      unholdData.id,
    );

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  get,
  getById,
  create,
  transfer,
};
