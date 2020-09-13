# Shopify Multipass token generator

[![CircleCI branch](https://img.shields.io/circleci/build/github/Vernando05/shopify-multipass-service/master)](https://app.circleci.com/pipelines/github/Vernando05/shopify-multipass-service?branch=master)[
![Codecov branch](https://img.shields.io/codecov/c/gh/Vernando05/shopify-multipass-service/master)](https://codecov.io/gh/Vernando05/shopify-multipass-service)[
![Apollo GraphQL](https://img.shields.io/badge/Apollo_GraphQL-2.x-blue)](https://www.apollographql.com/)[
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/)[
![expressjs](https://img.shields.io/badge/express-4.x-blue)](https://expressjs.com/)[
![Jest](https://img.shields.io/badge/Jest-26.x-brightgreen)](https://jestjs.io/)[
![Firebase Cloud Functions](https://img.shields.io/badge/Firebase_Cloud_Functions-3.x-orange)](hhttps://firebase.google.com/)

# What is this?

Service to generate Shopify Multipass token, more info https://shopify.dev/docs/admin-api/rest/reference/plus/multipass

## Usage
This API service is using GraphQL:
```
mutation createMultipassToken($data: CustomerInput!) {
  createMultipassToken(data: $data) {
    firstName
    lastName
    email
    token
  }
}
```
Query variable:
```
{
  "data": {
    "firstName": "Jack",
    "lastName": "Lumber",
    "email": "jack@lumber.com"
  }
}
```

# License
MIT