const nock = require("nock");
const msRestAzure = require("ms-rest-azure");
const azureNx = require("../network/azure-virtual-network");
const azureNetwork = new azureNx(msRestAzure);

const params = {
  location: "centralus",
  addressSpace: {
    addressPrefixes: ["10.0.0.0/16"]
  }
};

describe("Azure Network", () => {
  it("should create virtual network", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodeCloud-unit/providers/Microsoft.Network/virtualNetworks/unittestnetwork?api-version=2018-02-01"
    )
      .put(/$/)
      .reply(200, {});

    azureNetwork
      .create("nodeCloud-unit", "unittestnetwork", params)
      .then(res => {
        console.log(res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
});
