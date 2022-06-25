import {
  evaluateTransaction,
  submitTransaction
} from "./Hyperledger.service.js";

/**
 * Get all accounts.
 *
 * @returns
 */
async function get() {
  try {
    const assets = await evaluateTransaction("GetAllAssets");
    return assets;
  }
  catch (error) {
    return "Assets not found";
  }
}

async function getById(id) {
  try {
    const asset = await evaluateTransaction("ReadAsset", id);
    return JSON.parse(asset)
  }
  catch (error) {
    console.log(error)
    return "Asset not found";
  }
}

/**
 * Create new asset.
 *
 * @param name
 * @returns
 */
async function create(assetObject) {
  try {
    // TODO change with params from frontend
    console.log(assetObject);
    await submitTransaction(
      "CreateAsset",
      [
        assetObject.assetId,
        assetObject.area,
        assetObject.location,
        assetObject.owner,
        assetObject.status
      ]
    );

    const result = await evaluateTransaction("ReadAsset", assetObject.assetId);

    return JSON.parse(result);
  } catch (error) {
    console.log(error)
    return error;
  }
}


//chaincode need an update functionality
// /**
//  * Update asset.
//  *
//  * @param name
//  * @returns
//  */
// async function update() {
//   try {
//     // TODO change with params from frontend
//     await submitTransaction(
//       "UpdateAsset",
//       "asset13",
//       "yellow",
//       "5",
//       "Tom",
//       "1300",
//     );
//     const result = await contract.evaluateTransaction("ReadAsset", "asset13");

//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

/**
 * Transfer asset.
 *
 * @param name
 * @returns
 */
async function transfer(transferObject) {
  try {
    // TODO change with params from frontend
    await submitTransaction("TransferAsset", transferObject.id, transferObject.owner);
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
    const result = await contract.evaluateTransaction("ReadAsset", unholdData.id);

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
  transfer,
};
