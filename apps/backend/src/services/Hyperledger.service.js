import FabricCAServices from "fabric-ca-client";
import { Gateway, Wallets } from "fabric-network";
import path, { dirname } from "path";
import { buildCCPOrg1, buildWallet } from "../utils/AppUtil.js";
import {
  buildCAClient,
  enrollAdmin,
  registerAndEnrollUser,
} from "../utils/CAUtil.js";

const channelName = "mychannel";
const chaincodeName = "basic";
const mspOrg1 = "Org1MSP";
const __dir = dirname("../");
const walletPath = path.join(__dir, "wallet");
const org1UserId = "appUser";
const org1Ca = "ca.org1.example.com";

let contract;

/**
 * Initialize hyperledger instance.
 *
 */
async function init() {
  const ccp = buildCCPOrg1();
  const caClient = buildCAClient(FabricCAServices, ccp, org1Ca);

  const wallet = await buildWallet(Wallets, walletPath);

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
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork(channelName);
    contract = network.getContract(chaincodeName);

    console.log("Fabric initialized successfully!");
  } catch (error) {
    console.log(error);
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
  return (await params)
    ? contract.submitTransaction(name, ...params)
    : contract.submitTransaction(name);
}

/**
 * Evaluate transaction
 *
 * @param name (function name)
 * @param params
 * @returns
 */
async function evaluateTransaction(name, params) {
  return (await params)
    ? contract.evaluateTransaction(name, params)
    : contract.evaluateTransaction(name);
}

export { init, submitTransaction, evaluateTransaction };
