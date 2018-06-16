const azureStorageX = require("../storage/queue-storage");
const azureStorage = new azureStorageX();

const queueName = "nodecloud-unit-test-queue";

describe("Azure Queue Storage", () => {
  it("should create a queue", done => {
    azureStorage
      .create(queueName)
      .then(res => {
        console.log(res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should insert a message", done => {
    azureStorage
      .insert(queueName, "test-message", {})
      .then(res => {
        console.log(res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should peek for message", done => {
    azureStorage
      .peek(queueName, {})
      .then(res => {
        console.log(res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should delete a queue", done => {
    azureStorage
      .delete(queueName, {})
      .then(res => {
        console.log(res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });
});
