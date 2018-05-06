const msRestAzure = require('ms-rest-azure');
const virtualmachine = require('./compute/virtualmachine')

class Azure {

  constructor() {
    this._azureRestSdk = msRestAzure;

    if (!process.env.AZURE_TENANT_ID ||
        !process.env.AZURE_CLIENT_ID ||
        !process.env.AZURE_SUBSCRIPTION_ID ||
        !process.env.AZURE_CLIENT_SECRET ) {
          throw new Error('Provide credentials')
        }

    return {
      getSDK: () => this._azureRestSdk,
      compute: this.virtualmachine,
    };
  }

  virtualmachine() {
    return new virtualmachine(this.getSDK());
  }
}

module.exports = Azure
