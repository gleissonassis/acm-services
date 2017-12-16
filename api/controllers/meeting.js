var settings        = require('../../config/settings');
var request         = require('request');

module.exports = function() {
  return {
    createMeeting: function(req, res) {
      var opt = {
         uri: 'https://login.microsoftonline.com/' + settings.tenant + '/oauth2/v2.0/token',
         method: 'POST',
         headers:{
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         form: {
          'client_id': settings.clientId,
          'scope': 'https://graph.microsoft.com/.default',
          'client_secret': settings.clientSecret,
          'grant_type': 'client_credentials'
        },
        json: true
       };

       request(opt, function (error, response, body) {
         console.log(body);
         if (error || (response && response.statusCode !== 200)) {
           res.status(500).json(error || response);
         } else {
           var endpoint = 'https://graph.microsoft.com/v1.0/users/';
           endpoint += settings.userPrincipalName + '/events?$filter=';
           endpoint += '(Start/DateTime+ge+\'' + req.body.startDate +
           '\'+and+Start/DateTime+le+\'' +
           req.body.endDate +
           '\')+or+(End/DateTime+ge+\'' +
           req.body.startDate +
           '\'+and+End/DateTime+le+\'' +
           req.body.endDate +
           '\')';

           console.log(endpoint);

           var optVerify = {
              uri: endpoint,
              method: 'GET',
              headers:{
                'Authorization': 'Bearer ' + body['access_token'],
                'Content-Type': 'application/json',
                'Prefer':'outlook.timezone="America/Sao_Paulo"'
              },
             json: true
            };

            request(optVerify, function (errorVerify, responseVerify, bodyVerify) {
              console.log(bodyVerify);
              if (bodyVerify.value.length > 0) {
                res.status(409).json(bodyVerify);
              } else {
                var optCreate = {
                   uri: 'https://graph.microsoft.com/v1.0/users/' + settings.userPrincipalName + '/events',
                   method: 'POST',
                   headers:{
                     'Authorization': 'Bearer ' + body['access_token'],
                     'Content-Type': 'application/json',
                     'Prefer':'outlook.timezone="America/Sao_Paulo"'
                   },
                   json: {
                    'subject': 'Sala reservada para ' + req.body.responsible,
                    'body': {
                      'contentType': 'HTML',
                      'content': 'Sala reservada para ' + req.body.responsible + ' pela Alexa'
                    },
                    'start': {
                        'dateTime': req.body.startDate,
                        'timeZone': 'America/Sao_Paulo'
                    },
                    'end': {
                        'dateTime': req.body.endDate,
                        'timeZone': 'America/Sao_Paulo'
                    },
                    'location':{
                        'displayName':'Sala Morumbi (BH 2)'
                    },
                    'attendees': [
                      {
                      'emailAddress': {
                          'name': 'Sala Morumbi (BH 2)',
                          'address': 'salamorumbi@sysmap.com.br'
                      }}
                    ]
                  }
                 };

                 request(optCreate, function (errorCreate, responseCreate, bodyCreate) {
                   console.log(bodyCreate);
                   res.status(200).json(bodyCreate);
                 });
              }
            });
         }
       });
    },
    verifyMeeting: function(req, res) {
      var opt = {
         uri: 'https://login.microsoftonline.com/' + settings.tenant + '/oauth2/v2.0/token',
         method: 'POST',
         headers:{
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         form: {
          'client_id': settings.clientId,
          'scope': 'https://graph.microsoft.com/.default',
          'client_secret': settings.clientSecret,
          'grant_type': 'client_credentials'
        },
        json: true
       };

       request(opt, function (error, response, body) {
         console.log(body);
         if (error || (response && response.statusCode !== 200)) {
           res.status(500).json(error || response);
         } else {
           var endpoint = 'https://graph.microsoft.com/v1.0/users/';
           endpoint += settings.userPrincipalName + '/events?$filter=';
           endpoint += '(Start/DateTime+ge+\'' + req.body.startDate +
           '\'+and+Start/DateTime+le+\'' +
           req.body.endDate +
           '\')+or+(End/DateTime+ge+\'' +
           req.body.startDate +
           '\'+and+End/DateTime+le+\'' +
           req.body.endDate +
           '\')';

           console.log(endpoint);

           var optVerify = {
              uri: endpoint,
              method: 'GET',
              headers:{
                'Authorization': 'Bearer ' + body['access_token'],
                'Content-Type': 'application/json',
                'Prefer':'outlook.timezone="America/Sao_Paulo"'
              },
             json: true
            };

            request(optVerify, function (errorVerify, responseVerify, bodyVerify) {
              console.log(bodyVerify);
              if (bodyVerify.value.length > 0) {
                res.status(409).json(bodyVerify);
              } else {
                 res.status(200).json(bodyVerify);
              }
            });
         }
       });
    }
  };
};
