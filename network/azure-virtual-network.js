const NetworkManagementClient = require("azure-arm-network");

class VirtualNetworks {
  constructor(azureRestSdk) {
    this._azureRestSdk = azureRestSdk;
  }

  create(resourceGroupName, networkName, params) {
    if (!resourceGroupName || !networkName) {
      throw new Error("Provide resourceGroupName, networkName");
    }

    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualNetworks.createOrUpdate(
          resourceGroupName,
          networkName,
          params
        );
      });

    return createPromise;
  }

  delete(resourceGroupName, networkName, params) {
    if (!networkName) {
      throw new Error("Provide networkName");
    }

    let deletePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualNetworks.deleteMethod(resourceGroupName, networkName, params);
      });

    return deletePromise;
  }

  get(resourceGroupName, networkName, params) {
    if (!networkName) {
      throw new Error("Provide networkName");
    }

    let getPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualNetworks.get(resourceGroupName, networkName, params);
      });

    return getPromise;
  }

  list(resourceGroupName) {
    if (!resourceGroupName) {
      throw new Error("Provide resourceGroupName");
    }

    let listPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualNetworks.list(resourceGroupName);
      });

    return listPromise;
  }

  createSubnet(resourceGroupName, networkName, subnetName, params) {
    if (!networkName || !subnetName) {
      throw new Error("Provide networkName and subnetName");
    }

    let subnetCreatePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).subnets.createOrUpdate(
          resourceGroupName,
          networkName,
          subnetName,
          params
        );
      });

    return subnetCreatePromise;
  }

  deleteSubnet(resourceGroupName, networkName, subnetName, params) {
    if (!networkName || !subnetName) {
      throw new Error("Provide networkName and subnetName");
    }

    let deleteSubnetPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).subnets.deleteMethod(
          resourceGroupName,
          networkName,
          subnetName,
          params
        );
      });

    return deleteSubnetPromise;
  }
}

module.exports = VirtualNetworks;
