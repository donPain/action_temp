"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
const axios_1 = __importDefault(require("axios"));
const creatorEmail = "nerdplis@gmail.com";
const creatorPassword = "mobralzera";
var data = JSON.stringify({
    query: `mutation{
    authenticationByEmail(email:"${creatorEmail}", password: "${creatorPassword}") {
        token
  }
}`,
    variables: {},
});
var config = {
    method: "post",
    url: "app.artia.com/graphql",
    headers: {
        "Content-Type": "application/json",
    },
    // data: data,
};
(0, axios_1.default)(JSON.stringify(config))
    .then(function (response) {
    const resObj = JSON.parse(JSON.stringify(response.data, undefined, 2));
    // const token = resObj.data.authenticationByEmail.token;
    // return token;
    console.log(JSON.stringify(resObj));
})
    .catch(function (error) {
    console.log(error);
});
