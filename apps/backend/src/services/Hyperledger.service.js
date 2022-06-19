import FabricCAServices from "fabric-ca-client";
import { Gateway, Wallets } from "fabric-network";
import path, { dirname } from "path";
import { buildCCPOrg1, buildWallet } from "../utils/AppUtil.js";
import {
  buildCAClient,
  enrollAdmin,
  registerAndEnrollUser,
} from "../utils/CAUtil.js";

// TODO change this constant
const channelName = "mychannel";
const chaincodeName = "basic";
const mspOrg1 = "Org1MSP";
const __dir = dirname("./");
const walletPath = path.join(__dir, "wallet");
const org1UserId = "appUser";
let contract;

/**
 * Initialize hyperledger instance.
 *
 */
async function init() {
  const ccp = buildCCPOrg1();
  const caClient = buildCAClient(FabricCAServices, ccp, "ca.org1.example.com");

  const wallet = await buildWallet(Wallets, walletPath);

  // TODO update connection-org json on utils folder after deploying chaincode
  await enrollAdmin(caClient, wallet, mspOrg1);
  await registerAndEnrollUser(
    caClient,
    wallet,
    mspOrg1,
    org1UserId,
    "org1.department1",
  );

  const gateway = new Gateway();

  try {
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      //  TODO change to fabric endpoint
      discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
    });

    const network = await gateway.getNetwork(channelName);
    contract = network.getContract(chaincodeName);

    // TODO change function name based on actual chaincode
    await submitTransaction("InitLedger");

    console.log("Fabric initialized successfully");
  } catch (error) {
    throw new Error("Failed to initialize fabric", error);
  }
}

/**
 * Submit transaction
 *
 * @param name (function name)
 * @param params
 * @returns
 */
async function submitTransaction(name, params) {
  return await contract.submitTransaction(name, ...params);
}

/**
 * Evaluate transaction
 *
 * @param name (function name)
 * @param params
 * @returns
 */
async function evaluateTransaction(name, params) {
  return await contract.evaluateTransaction(name, ...params);
}

export { init, submitTransaction, evaluateTransaction };
