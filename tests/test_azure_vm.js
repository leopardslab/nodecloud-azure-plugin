const chai = require("chai");
const assert = chai.assert;
const nock = require("nock");
const msRestAzure = require("ms-rest-azure");
const azureVMx = require("../compute/virtual_machine");
const azureVM = new azureVMx(msRestAzure);

describe("Azure VM", () => {
  it("should list VMs", done => {
    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/providers/Microsoft.Compute/virtualMachines?api-version=2017-12-01",
      {
        reqheaders: {}
      }
    )
      .get()
      .reply(200, {});

    azureVM
      .list("nodecloud")
      .then(res => {
        console.log(res);
      })
      .catch(res => {
        console.error(res);
      });
  });
});
