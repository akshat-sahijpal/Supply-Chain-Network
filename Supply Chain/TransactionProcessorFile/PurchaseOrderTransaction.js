/**
 * Initiate Purchase order from one trader to another
 * @param {org.supplychain.network.InitPurchaseOrder} InitiatePO 
 * @transaction 
 */
var NS = 'org.supplychain.network'
function InitPO(InitiatePO) {
 /// Using Factory API : Factory to create instances of Resource: transactions, participants and assets.
 var factory = getFactory()
 // Store the identity of the calling person whose init the po
 var current = getCurrentParticipant()
 var order = factory.newResource(namespace=NS, asset='PO', primarykey=InitiatePO.orderId) // Creates a newInstance of Transaction 
  order.items = InitiatePO.items
  if(InitiatePO.totalPrice){
    order.totalPrice = InitiatePO.totalPrice
  }
  order.status = 'Started'
  order.orderer = current
  order.vendor = InitiatePO.vendor
// getAssetRegistry($asset)
  let assetRegistry = getAssetRegistry(order.getFullyQualifiedType()).then(function(assetRegistry) {
            assetRegistry.add(order)
  }) //getFullyQualifiedType(): Gets The type of order
}