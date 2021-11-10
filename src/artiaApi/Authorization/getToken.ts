//
import axios, { AxiosError } from "axios";

const creatorEmail: string = "nerdplis@gmail.com";
const creatorPassword: string = "mobralzera";

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

axios(JSON.stringify(config))
  .then(function (response) {
    const resObj = JSON.parse(JSON.stringify(response.data, undefined, 2));
    // const token = resObj.data.authenticationByEmail.token;
    // return token;
    console.log(JSON.stringify(resObj));
  })
  .catch(function (error) {
    console.log(error);
  });
