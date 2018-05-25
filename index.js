const msRestAzure = require("ms-rest-azure");
const virtualmachine = require("./compute/virtual_machine");
const blobStorage = require("./storage/blob_storage");

class Azure {
  constructor() {
    this._azureRestSdk = msRestAzure;

    if (
      !process.env.AZURE_TENANT_ID ||
      !process.env.AZURE_CLIENT_ID ||
      !process.env.AZURE_SUBSCRIPTION_ID ||
      !process.env.AZURE_CLIENT_SECRET
    ) {
      throw new Error("Provide credentials");
    }

    return {
      getSDK: () => this._azureRestSdk,
      compute: this.virtualmachine,
      blob: this.blobstorage
    };
  }

  virtualmachine() {
    return new virtualmachine(this.getSDK());
  }

  blobstorage() {
    return new blobStorage();
  }
}

module.exports = Azure;
