'use strict';

const CONNECT_STR = "DefaultEndpointsProtocol=" //The full key has intentionally been deleted due to being a paid monthly service.  Feel free to view the report screen shots or I can always give another demo.
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

 module.exports = {
   logEvent: logEvent
 }
