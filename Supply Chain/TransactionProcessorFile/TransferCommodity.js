/**
 * Tracks the trade of commodity from one trader to other 
 * @param {org.supplychain.network.TransferCommodity} transferCommodity 
 * @transaction 
 */
var NS = 'org.supplychain.network'
function tranferCommodityOp(transferCommodity){
  var current = getCurrentParticipant()
  transferCommodity.commodity.issuer = current // Because the current user is transferring 
  transferCommodity.commodity.owner = transferCommodity.newOwner
  transferCommodity.commodity.purchaseOrder = transferCommodity.po
  let factory = getFactory() 
  var newTrace = factory.newConcept(NS, 'Tracer')
  newTrace.timestamp = new Date()
  newTrace.location =  transferCommodity.shipperLocation
  newTrace.currentCompanyTrading = current
  transferCommodity.commodity.trace.push(newTrace)
  return getAssetRegistry(transferCommodity.getFullyQualifiedType()).then(
      function(assetRegistry){
        return assetRegistry.update(transferCommodity.commodity)
      }
  )
}
/* 
transaction TransferCommodity { // When Accomodation are tranfered from one participant to other
  --> Commodity commodity
  --> Trader newOwner 
  --> Trader issuer
  --> PurchaseOrder po
  o Address shipperLocation
}*/