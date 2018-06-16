const azureStorageX = require("../storage/blob-storage");
const nock = require("nock");
const azureStorage = new azureStorageX();

const containerName = "nodecloud-unit-test";

describe("Azure Blob Storage", () => {
  it("should create container", done => {
    azureStorage
      .create(containerName, { publicAccessLevel: "blob" })
      .then(res => {
        console.log(res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should list containers", done => {
    azureStorage
      .list(null, {})
      .then(res => {
        console.log(res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should upload to container", done => {
    azureStorage
      .upload(containerName, "unit-test-blob", "./package.json", {})
      .then(res => {
        console.log(res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should delete container", done => {
    azureStorage
      .delete(containerName, {})
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
