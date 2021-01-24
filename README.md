# bossa-box-backend-node

Rest API em NodeJS, utilizando PostGres como banco de dados.

# Preparando o ambiente

## Setup

Abra um terminal, no root do projeto, e digite:

    - npm run setup

## Subindo os requerimentos necessários

No mesmo terminal, digite:

    - npm run postgres:start

## Faça a migração no banco de dados (se necessário)
    - npm run migrate

## Subindo o ambiente web

Para iniciar o servidor web digite:

    - npm start


## Verificando o ambiente

Utilize o curl para verificar se o sistema esta funcinando corretamente, digitando:

```
curl --request GET 'http://127.0.0.1:3000'
```


# ENDPOINTS

## Criar usuário
Para criar um novo usuário:

- `METHOD`: `POST`
- `ENDPOINT`: /users
- - `BODY`:
```
{
    "nome": "Everton Tomalok",
    "email": "evertontomalok123@gmail.com",
    "senha": "12345"
}
```

 `RETORNO`:

```
{
    "status": "ok",
    "data": {
        "id": 1 // Incremental
    }
}
```


## Autenticando e gerando token de autenticação

Rota usada para autenticação e gerar token de autenticação que será usado nos outros endpoints

- `METHOD`: `POST`
- `ENDPOINT`: /users/auth
- `BODY`:
```
{
    "email": "evertontomalok123@gmail.com",
    "senha": "12345"
}
```

 `RETORNO`:

```
{
    "status": "ok",
    "data": {
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldmVydG9udG9tYWxvazEyM0BnbWFpbC5jb20iLCJpYXQiOjE2MTA5MzU4MzUsImV4cCI6MTYxMDkzOTQzNX0.yHv2twysavq8GtHI1ja-ekTuEwwLHtBDKcWsEzriijI"
    }
}
```


## Adicionar novo documento

- `METHOD`: `POST`
- `ENDPOINT`: /tools
- `HEADER`: `authorization` = `Bearer ...`
- `BODY`:
```
{
     "title": "Api",
     "link": "https://github.com/python/node-scrapper",
     "description": "Webservice.",
     "tags":["node", "express",  "scrapping", "axios"]
 }
```

 `RETORNO`:

```
{
    "status": "ok",
    "data": {
        "title": "Api",
        "link": "https://github.com/python/node-scrapper",
        "description": "Webservice.",
        "tags": [
            "node",
            "express",
            "scrapping",
            "axios"
        ],
        "id": "SOME ID"
    }
}
```


## Procurar Documentos

Rota para procurar documentos. Caso apenas chamada, trás todos os documentos ( lógica de negócio ).
Aceita parametros `tag` para filtro, e `skip` para pular documentos, e `limit` para limitar numero de documentos
no retorno.

- `METHOD`: `GET`
- `ENDPOINT`: /tools
- `PARAMETROS`: OPCIONAIS
  - tag (filtrar pela tag)
  - skip (pula numero de documentos)
  - limit  (limita o numero de documentos)
- `HEADER`: `authorization` = `Bearer ...`


 `RETORNO`:

```
{
    "status": "ok",
    "data": [
        {
            "title": "Api",
            "link": "https://github.com/python/node-scrapper",
            "description": "Webservice.",
            "tags": [
                "node",
                "express",
                "scrapping",
                "axios"
            ],
            "id": "SOME ID"
        },
        {
            "title": "WebServer",
            "link": "https://github.com/python/node-webserver",
            "description": "Web",
            "tags": [
                "node",
                "express",
                "react",
                "mongodb"
            ],
            "id": "SOME ID"
        },
        ...
    ]
}
```

## Editar documento

Rota para edição de documento

- `METHOD`: `PUT`
- `ENDPOINT`: /tools/:id
- `HEADER`: `authorization` = `Bearer ...`
- `BODY`:
```
{
     "title": "New API",
     "link": "https://github.com/python/python-new-api",
     "description": "NEW Webservice.",
     "tags":["python", "requests",  "scrapping", "bs4", "xpath"]
 }
```

 `RETORNO`:

```
{
    "status": "ok",
    "data": {
        "id": 1,
        "title": "New API",
        "link": "NEW Webservice.",
        "description": "https://github.com/python/python-new-api",
        "tags": [
            "python",
            "requests",
            "scrapping",
            "bs4",
            "xpath"
        ]
    }
}
```

## Remover documento

Rota para remoção de documento por um ids

- `METHOD`: `DELETE`
- `ENDPOINT`: /tools/:id
- `HEADER`: `authorization` = `Bearer ...`

 `RETORNO`:

```
    204 NO CONTENT
```

# Variáveis de ambiente


| Chave      | Descrição                                  |
|------------|--------------------------------------------| 
| DB_HOST    | HOST de acesso ao PostGres                 |
| DB_PORT    | PORTA de acesso ao PostGres                |
| DB_PW      | Senha do PostGres                          |
| DB_USER    | Usuário do PostGres                        |
| DB_NAME    | Nome do databa no PostGres                 |
| JWT_SECRET | Segredo para geração de token              |