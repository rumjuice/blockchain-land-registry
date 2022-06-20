/*
 SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const {Contract} = require('fabric-contract-api');

class Chaincode extends Contract {

	// *** CreateAsset - create a new asset, store into chaincode state ***
	async CreateAsset(ctx, assetID, area, location, size, owner, status) {
		const exists = await this.AssetExists(ctx, assetID);
		if (exists) {
			throw new Error(`The asset ${assetID} already exists`);
		}

		// ==== Create asset object and marshal to JSON ====
		let asset = {
			docType: 'asset',
			assetID: assetID,
			area: area,
			location: location,
			owner: owner,
			status: status
		};

		// === Save asset to state ===
		await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(asset)));
		let indexName = 'owner~id';
		let ownerIdIndexKey = await ctx.stub.createCompositeKey(indexName, [asset.owner, asset.assetID]);

		//  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the land.
		//  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
		await ctx.stub.putState(ownerIdIndexKey, Buffer.from('\u0000'));
	}
 
}

module.exports = Chaincode;
 
