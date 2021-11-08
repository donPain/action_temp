"use strict";
const { error } = require("@actions/core");
var unirest = require("unirest");
module.exports = function getToken(creatorEmail, creatorPassword) {
    return new Promise((resolve, reject) => unirest("POST", "https://app.artia.com/graphql")
        .headers({
        "Content-Type": "application/json",
    })
        .send(JSON.stringify({
        query: `mutation{
    authenticationByEmail(email:"${creatorEmail}", password: "${creatorPassword}") {
        token
  }
}`,
        variables: {},
    }))
        .end(function (res) {
        if (res.error) {
            return reject(res.error);
        }
        const resObj = JSON.parse(res.raw_body);
        const token = resObj.data.authenticationByEmail.token;
        return resolve(token);
    }));
};
