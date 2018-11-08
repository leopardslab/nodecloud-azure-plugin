# Nodecloud-azure-plugin

### Setting Credentials in environment variables

Please follow this [link](https://github.com/Azure/azure-sdk-for-node/blob/master/Documentation/Authentication.md#service-principal-authentication) to create azure Credentials and set them in env variables using following Keys:

`export AZURE_CLIENT_SECRET=<Azure Client Secret>`

`export AZURE_TENANT_ID=<Azure Tenant Id>`

`export AZURE_CLIENT_ID=<Azure Client Id>`

`export AZURE_SUBSCRIPTION_ID=<Azure Subscription Id>`

## Note:

Please use same key names as they are used in this plugin implementation.

# Quick Start Guide

Please make sure you have `.nc.config` file in the project root and have `nodecloud-core` installed.

Content of `.nc.config` file is assumed as the following json structure.
It is an array of supported providers.

1.  `name` : It is the provider name which nodecloud-core supports.
2.  `tag` : It is the name that you will use to load the given provider. It is for your reference in code. It can be anything that you may like.
3.  `libName` : It is the name of the library which has to be installed before loading a provider.

This config file can contain array of objects for all providers and all will be loaded.
Supported values for `name` : Azure, google, AWS

```js
[
  {
    name: "Azure",
    tag: "azure",
    libName: "nodecloud-azure"
  },
  {
    ... // For Google
  }
];

module.exports = providers;
```

For code on quick start, please check the doc folder [here](https://github.com/cloudlibz/nodecloud-azure-plugin/tree/master/docs)
