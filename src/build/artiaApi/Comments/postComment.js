// @ts-nocheck
"use strict";
var unirest = require("unirest");
var asyncGetToken = require("../Authorization/getToken");
// // const content: String = "Comentário da api";
// const organizationId: Number = 111402;
// const accountId: Number = 3757321;
// const activityId: Number = 19689573;
//Parametros la do core do action {organizationId, accountId}
//Parametros informados no commit através de t:{activityId} | tudo que estiver dentro do comentário irá para tarefa.
module.exports = async function createComment(organizationId, accountId, activityId, creatorEmail, creatorPassword, content) {
    var newToken = await asyncGetToken(creatorEmail, creatorPassword);
    var req = unirest("POST", "https://app.artia.com/graphql")
        .headers({
        OrganizationId: organizationId.toString(),
        "Content-Type": "application/json",
        Authorization: "Bearer " + newToken,
    })
        .send(JSON.stringify({
        query: `mutation{
      createComment(
          accountId: ${accountId}, #obrigatório
          id: ${activityId}, #obrigatório
          object: "activity", #obrigatório
          content: "${content}", #obrigatório | Quando for string dentro de variável com $ usar tbm os ""
          createdBy: "${creatorEmail}", #opcional, pode ser id ou email
      ) {
          id,
          content,
          createdAt,
          createdByApi,  
          author {
              id,
              name,
              email
          },
          registeredBy {
              id,
              name,
              email
          }
          users {
              id,
              name,
              email
          }
  
      }
  }`,
        variables: {},
    }))
        .end(function (res) {
        if (res.error)
            throw new Error(res.error);
        console.log(res.raw_body);
    });
};
