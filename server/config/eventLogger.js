'use strict';

const CONNECT_STR = "DefaultEndpointsProtocol=https;AccountName=swe681diag290;AccountKey=UCRwV/x01pLitbeyGJYMi0TGx5QLuuWYVynAxMQIjNMKAkNhHzXZY5wlxPZeoy5uyUbqj2WERu97nNXC0wv2ZQ==;EndpointSuffix=core.windows.net"
const CONTAINER_NAME = 'errorlog';
const { BlobServiceClient } = require('@azure/storage-blob');
const uuidv1 = require('uuid/v1');

const logEvent = async (container, data) => {
  const blobServiceClient = await BlobServiceClient.fromConnectionString(CONNECT_STR);
  const containerClient = await blobServiceClient.getContainerClient(container);

  const blobName = 'logstart' + uuidv1() + '.txt';
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log('\nUploading to Azure storage as blob:\n\t', blobName);
  //const data = 'Hello, BicycleMarketplace!';
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

};

//logEvent().then( () => console.log("done")).catch( (ex) => console.log(ex.message) );


 module.exports = {
   logEvent: logEvent
 }
