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

	
	// *** ReadAsset returns the asset stored in the world state with given id ***
	async ReadAsset(ctx, id) {
		const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
		if (!assetJSON || assetJSON.length === 0) {
			throw new Error(`Asset ${id} does not exist`);
		}

		return assetJSON.toString();
	}
	
	
	// *** delete - remove a asset key/value pair from state ***
	async DeleteAsset(ctx, id) {
		if (!id) {
			throw new Error('Asset id must not be empty');
		}

		let exists = await this.AssetExists(ctx, id);
		if (!exists) {
			throw new Error(`Asset ${id} does not exist`);
		}

		// to maintain the owner~id index, we need to read the asset first and get its owner
		let valAsbytes = await ctx.stub.getState(id); // get the asset from chaincode state
		let jsonResp = {};
		if (!valAsbytes) {
			jsonResp.error = `Asset does not exist: ${id}`;
			throw new Error(jsonResp);
		}
		let assetJSON;
		try {
			assetJSON = JSON.parse(valAsbytes.toString());
		} catch (err) {
			jsonResp = {};
			jsonResp.error = `Failed to decode JSON of: ${id}`;
			throw new Error(jsonResp);
		}
		await ctx.stub.deleteState(id); //remove the asset from chaincode state

		// delete the index
		let indexName = 'owner~id';
		let ownerIdIndexKey = ctx.stub.createCompositeKey(indexName, [assetJSON.owner, assetJSON.assetID]);
		if (!ownerIdIndexKey) {
			throw new Error(' Failed to create the createCompositeKey');
		}
		//  Delete index entry to state.
		await ctx.stub.deleteState(ownerIdIndexKey);
	}

	
}

module.exports = Chaincode;
 
