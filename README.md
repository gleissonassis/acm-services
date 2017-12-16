# acm-services
Alexa Calendar Manager

## Sobre o projeto

Esse é um projeto de avaliação do Microsoft Graph para gerenciamento de eventos no calendário de usuários.

## Configurações
Para subir o serviço é necessário criar o arquivo config/settings.private.js com a seguinte estrutura:

```javascript
module.exports = {
    tenant: 'dominio.com.br',
    clientId: 'APP_ID',
    clientSecret: 'APP_SECRET',
    userPrincipalName: 'donodocalendario@dominio.com.br'
};
```

## Instalação
```
git clone https://github.com/gleissonassis/acm-services.git
cd acm-services
npm install
npm start
```

Caso queira iniciar um container docker:

```
git clone https://github.com/gleissonassis/acm-services.git
cd acm-services
docker image build -t "acm-services:latest" .
docker container run -d -p 3000:3000 "acm-services:latest"
```

## Utilização

### Agendando uma reunião

```
POST /v1/meetings
{
	"startDate":"2017-12-18T18:00:00",
	"endDate":"2017-12-18T20:00:00",
	"responsible": "Gleisson de Assis"
}
```

### Verificando se há disponibilidade

```
POST /v1/meetings/verify
{
	"startDate":"2017-12-18T18:00:00",
	"endDate":"2017-12-18T20:00:00",
	"responsible": "Gleisson de Assis"
}
```
