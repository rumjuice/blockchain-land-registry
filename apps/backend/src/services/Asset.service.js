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
 * @param transferObject
 * @returns
 */
async function transfer(transferObject) {
  try {
    await submitTransaction("TransferAsset", [
      transferObject.id,
      transferObject.owner,
    ]);

    const result = await evaluateTransaction("ReadAsset", transferObject.id);

    return JSON.parse(result);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * hold asset.
 *
 * @param id
 * @returns
 */
async function hold(id) {
  try {
    await submitTransaction("HoldAsset", [id]);
    const result = await evaluateTransaction("ReadAsset", id);

    return JSON.parse(result);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Unhold asset.
 *
 * @param id
 * @returns
 */
async function unhold(id) {
  try {
    await submitTransaction("UnHoldAsset", [id]);
    const result = await evaluateTransaction("ReadAsset", id);

    return JSON.parse(result);
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  get,
  getById,
  create,
  transfer,
  hold,
  unhold,
};
