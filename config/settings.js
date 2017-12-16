var privateSettings     = require('./settings.private');

module.exports = {
    servicePort: 3000,
    tenant: privateSettings.tenant,
    clientId: privateSettings.clientId,
    clientSecret: privateSettings.clientSecret,
    userPrincipalName: privateSettings.userPrincipalName
};
