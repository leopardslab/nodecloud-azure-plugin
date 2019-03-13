const DNSManagementClient = require("azure-arm-dns");

class DNSManagement {
	constructor(azureRestSdk) {
		this._azureRestSdk = azureRestSdk;
	}

	createOrUpdate(resourceGroupName, zoneName, relativeRecordSetName, recordType, parameters) {
		if (!resourceGroupName || !zoneName || !relativeRecordSetName || !recordType || !parameters ) {
			throw new Error("Provide required resourceGroupName, zoneName, relativeRecordSetName, recordType")
		}

		let createPromise = this._azureRestSdk
	      .loginWithServicePrincipalSecret(
	        process.env.AZURE_CLIENT_ID,
	        process.env.AZURE_CLIENT_SECRET,
	        process.env.AZURE_TENANT_ID
	      )
	      .then(credentials => {
	        return new DNSManagementClient(
	          credentials,
	          process.env.AZURE_SUBSCRIPTION_ID
	        ).recordSets.createOrUpdate(
						resourceGroupName,
						zoneName,
						relativeRecordSetName,
						recordType,
						parameters
	        );
	      });
    	return createPromise;
	}

	deleteMethod(resourceGroupName, zoneName, relativeRecordSetName, recordType) {
		if (!resourceGroupName || !zoneName || !relativeRecordSetName || !recordType) {
			throw new Error("Provide required resourceGroupName, zoneName, relativeRecordSetName")
		}

		let deletePromise = this._azureRestSdk
	      .loginWithServicePrincipalSecret(
	        process.env.AZURE_CLIENT_ID,
	        process.env.AZURE_CLIENT_SECRET,
	        process.env.AZURE_TENANT_ID
	      )
	      .then(credentials => {
	        return new DNSManagementClient(
	          credentials,
	          process.env.AZURE_SUBSCRIPTION_ID
	        ).recordSets.deleteMethod(
						resourceGroupName,
						zoneName,
						relativeRecordSetName
	        );
	      });
    	return deletePromise;
	}

	get(resourceGroupName, zoneName, relativeRecordSetName, recordType)  {
		if (!resourceGroupName || !zoneName || !relativeRecordSetName || !recordType) {
			throw new Error("Provide required resourceGroupName, zoneName, relativeRecordSetName, recordType")
		}

		let getPromise = this._azureRestSdk
	      .loginWithServicePrincipalSecret(
	        process.env.AZURE_CLIENT_ID,
	        process.env.AZURE_CLIENT_SECRET,
	        process.env.AZURE_TENANT_ID
	      )
	      .then(credentials => {
	        return new DNSManagementClient(
	          credentials,
	          process.env.AZURE_SUBSCRIPTION_ID
	        ).recordSets.get(
						resourceGroupName,
						zoneName,
						relativeRecordSetName,
						recordType
	        );
	      });
    	return getPromise;
	}

	listByDnsZone(resourceGroupName, zoneName) {
		if (!resourceGroupName || !zoneName) {
			throw new Error("Provide required resourceGroupName, zoneName")
		}

		let listPromise = this._azureRestSdk
	      .loginWithServicePrincipalSecret(
	        process.env.AZURE_CLIENT_ID,
	        process.env.AZURE_CLIENT_SECRET,
	        process.env.AZURE_TENANT_ID
	      )
	      .then(credentials => {
	        return new DNSManagementClient(
	          credentials,
	          process.env.AZURE_SUBSCRIPTION_ID
	        ).recordSets.listByDnsZone(
						resourceGroupName,
						zoneName,
	        );
	      });
    	return listPromise;
	}
}

module.exports = DNSManagement;
