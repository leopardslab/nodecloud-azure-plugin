const azureStorageService = require("azure-storage");

class BlobStorage {
  constructor() {
    this._storageService = azureStorageService.createBlobService();
  }

  checkParams() {
    if (
      !process.env.AZURE_STORAGE_ACCESS_KEY ||
      !process.env.AZURE_STORAGE_CONNECTION_STRING ||
      !process.env.AZURE_STORAGE_ACCOUNT
    ) {
      throw new Error(
        "Please provide storage access key and storage connection string"
      );
    }
  }
  createContainer(containerName, params) {
    this.checkParams();
    return new Promise((resolve, reject) => {
      if (!params) {
        reject(new Error("Provide params"));
      }

      this._storageService.createContainerIfNotExists(
        containerName,
        params,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  deleteContainer(containerName, params) {
    this.checkParams();
    return new Promise((resolve, reject) => {
      if (!params) {
        reject(new Error("Provide params"));
      }

      this._storageService.deleteContainerIfExists(
        containerName,
        params,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}

module.exports = BlobStorage;
