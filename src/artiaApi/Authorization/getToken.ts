const { error } = require("@actions/core");
var unirest = require("unirest");

module.exports = function getToken(
  creatorEmail: string,
  creatorPassword: string
) {
  return new Promise((resolve, reject) =>
    unirest("POST", "https://app.artia.com/graphql")
      .headers({
        "Content-Type": "application/json",
      })
      .send(
        JSON.stringify({
          query: `mutation{
    authenticationByEmail(email:"${creatorEmail}", password: "${creatorPassword}") {
        token
  }
}`,
          variables: {},
        })
      )
      .end(function (res: { error: any; raw_body: string }) {
        if (res.error) {
          return reject(res.error);
        }
        const resObj = JSON.parse(res.raw_body);
        const token = resObj.data.authenticationByEmail.token;
        console.log(token);
        return resolve(token);
      })
  );
};
