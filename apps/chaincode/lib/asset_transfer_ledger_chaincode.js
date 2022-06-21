/*
 SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const {Contract} = require('fabric-contract-api');

class Chaincode extends Contract {

	// *** CreateAsset - create a new asset, store into chaincode state ***
	async CreateAsset(ctx, assetID, area, location, owner, status, lock) {
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
			status: status,
			lock: lock
		};

		// === Save asset to state ===
		await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(asset)));
		let indexName = 'status~id';
		let statusIdIndexKey = await ctx.stub.createCompositeKey(indexName, [asset.status, asset.assetID]);

		//  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the land asset.
		//  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
		await ctx.stub.putState(statusIdIndexKey, Buffer.from('\u0000'));
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

		// to maintain the status~id index, we need to read the asset first and get its status
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
		let indexName = 'status~id';
		let statusIdIndexKey = ctx.stub.createCompositeKey(indexName, [assetJSON.status, assetJSON.assetID]);
		if (!statusIdIndexKey) {
			throw new Error(' Failed to create the createCompositeKey');
		}
		//  Delete index entry to state.
		await ctx.stub.deleteState(statusIdIndexKey);
	}
	
	
	// *** TransferAsset transfers a asset by setting a new owner name on the asset ***
	async TransferAsset(ctx, assetId, newOwner) {

		let assetAsBytes = await ctx.stub.getState(assetId);
		if (!assetAsBytes || !assetAsBytes.toString()) {
			throw new Error(`Asset ${assetId} does not exist`);
		}
		let assetToTransfer = {};
		try {
			assetToTransfer = JSON.parse(assetAsBytes.toString()); //unmarshal
		} catch (err) {
			let jsonResp = {};
			jsonResp.error = 'Failed to decode JSON of: ' + assetId;
			throw new Error(jsonResp);
		}
		assetToTransfer.owner = newOwner; //change the owner

		let assetJSONasBytes = Buffer.from(JSON.stringify(assetToTransfer));
		await ctx.stub.putState(assetId, assetJSONasBytes); //rewrite the asset
	}
	
	
	// *** HoldAsset locks an asset by setting the lock property to "TRUE" ***
	async HoldAsset(ctx, assetId) {

		let assetAsBytes = await ctx.stub.getState(assetId);
		if (!assetAsBytes || !assetAsBytes.toString()) {
			throw new Error(`Asset ${assetId} does not exist`);
		}
		let assetToTransfer = {};
		try {
			assetToTransfer = JSON.parse(assetAsBytes.toString()); //unmarshal
		} catch (err) {
			let jsonResp = {};
			jsonResp.error = 'Failed to decode JSON of: ' + assetId;
			throw new Error(jsonResp);
		}
		assetToTransfer.lock = true; //Hold (lock) the asset

		let assetJSONasBytes = Buffer.from(JSON.stringify(assetToTransfer));
		await ctx.stub.putState(assetId, assetJSONasBytes); //rewrite the asset
	}
	
	
	// UnHoldAsset unlocks an asset by setting the lock property to "FALSE".
	async UnHoldAsset(ctx, assetId) {

		let assetAsBytes = await ctx.stub.getState(assetId);
		if (!assetAsBytes || !assetAsBytes.toString()) {
			throw new Error(`Asset ${assetId} does not exist`);
		}
		let assetToTransfer = {};
		try {
			assetToTransfer = JSON.parse(assetAsBytes.toString()); //unmarshal
		} catch (err) {
			let jsonResp = {};
			jsonResp.error = 'Failed to decode JSON of: ' + assetId;
			throw new Error(jsonResp);
		}
		assetToTransfer.lock = false; //Unhold (unlock) the asset
	
		let assetJSONasBytes = Buffer.from(JSON.stringify(assetToTransfer));
		await ctx.stub.putState(assetId, assetJSONasBytes); //rewrite the asset
	}


	// *** GetAssetsByRange performs a range query based on the start and end keys provided ***
	// Read-only function results are not typically submitted to ordering. If the read-only
	// results are submitted to ordering, or if the query is used in an update transaction
	// and submitted to ordering, then the committing peers will re-execute to guarantee that
	// result sets are stable between endorsement time and commit time. The transaction is
	// invalidated by the committing peers if the result set has changed between endorsement
	// time and commit time.
	// Therefore, range queries are a safe option for performing update transactions based on query results.
	async GetAssetsByRange(ctx, startKey, endKey) {

		let resultsIterator = await ctx.stub.getStateByRange(startKey, endKey);
		let results = await this.GetAllResults(resultsIterator, false);

		return JSON.stringify(results);
	}

	
}

module.exports = Chaincode;
 
