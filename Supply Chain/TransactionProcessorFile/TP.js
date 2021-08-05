
/*
* Transaction File 
* @param org.supplychain.network.TransferCommodity tx        {Used to map transaction processor file to the model file }
* @transaction                                              {function is a buisness logic for the transaction file, these functions can be both synchronous[when doing a complex calculations] and async [When interacting with blockchain]}
*/
// @commit(false) this does not makes the function to commit anything to  the blockchain
// @returns(String) is used when the transaction function returns something 
async function TranferCommodityTransaction(tx) { // tx: it is mapped with TransferCommodity (@param)
   let Quantity = tx.commodity.quantity
   tx.commodity.quantity = 200
   /// Asset Registery ->The AssetRegistry is used to manage a set of assets stored on the Blockchain.
   //An asset registry can be used to retrieve, update, or delete existing assets, or create new assets.
   let assetRegistry = getAssetRegistry('org.supplychain.network.Commodity') // Returns a Promise 
   await assetRegistry.update(tx.commodity) // update the Commodity 
}

function complexCalcultion(a, be){}