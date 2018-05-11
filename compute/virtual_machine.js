var ComputeManagementClient = require('azure-arm-compute');

class VirtulMachines {
  /**
   * VM constructor
   * @constructor
   * @param {object} azureRestSdk - AzureRest SDK
   */
  constructor(azureRestSdk) {
     this._azureRestSdk = azureRestSdk;
   }

   /**
    * Create VM on azure account
    * @param String resourceGroupName
    * @param String vmName
    * @param {object} parameters
    */
   createOrUpdate(resourceGroupName, vmName, parameters) {
     if (!resourceGroupName || !vmName || !parameters) {
       throw new Error('Provide resourceGroupName, vmName and parameters');
     }

     var createPromise = this._azureRestSdk
                              .loginWithServicePrincipalSecret(process.env.AZURE_CLIENT_ID,
                                process.env.AZURE_CLIENT_SECRET,
                                process.env.AZURE_TENANT_ID)
                              .then((credentials) => {
                                return new ComputeManagementClient(credentials, process.env.AZURE_SUBSCRIPTION_ID)
                                          .virtualMachines.createOrUpdate(resourceGroupName, vmName, parameters);
                              });
      return createPromise;
   }

   /**
   * List all virtual machines in a resourceGroup
   * @param String resourceGroupName
   */
   list(resourceGroupName) {
     if (!resourceGroupName) {
       throw new Error("Please provide resourceGroupName");
     }

     var listPromise = this._azureRestSdk
                           .loginWithServicePrincipalSecret(process.env.AZURE_CLIENT_ID,
                             process.env.AZURE_CLIENT_SECRET,
                             process.env.AZURE_TENANT_ID)
                           .then((credentials) => {
                             return new ComputeManagementClient(credentials, process.env.AZURE_SUBSCRIPTION_ID)
                                        .virtualMachines.list(resourceGroupName);
                           });
      return listPromise;
   }

   /**
   * start a virtual machine
   * @param String 
   */
}

module.exports = VirtulMachines;
