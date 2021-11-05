var unirest = require("unirest");
var asyncGetToken = require("../Authorization/getToken");

// const organizationId: Number = 111402;
// const accountId: Number = 3757321;
// const folderId = 3764173;
// const estimatedEffort = 3;
// const title = "Teste de atividade";
// const description = "descrição de atividade";
// const creatorEmail = "nerdplis@gmail.com";
// const creatorPassword = "mobralzera";
// // const activityId: Number = 19689573;

//Parametros la do core do action {organizationId, accountId}
//Parametros informados no commit através de t:{activityId} | tudo que estiver dentro do comentário irá para tarefa.

module.exports = async function createActivity(
  organizationId: number,
  accountId: number,
  folderId: number,
  title: string,
  description: string,
  categoryText: string,
  estimatedEffort: number,
  creatorEmail: string,
  creatorPassword: string
) {
  var newToken = await asyncGetToken(creatorEmail, creatorPassword);
  var req = unirest("POST", "https://app.artia.com/graphql")
    .headers({
      OrganizationId: organizationId.toString(),
      "Content-Type": "application/json",
      Authorization: "Bearer " + newToken,
    })
    .send(
      JSON.stringify({
        query: `mutation{
          createActivity(
            title: "${title}",
            accountId: ${accountId},  # OBRIGATÓRIO - ID do grupo de trabalho
            folderId: ${folderId}, # OBRIGATÓRIO - ID da pasta ou do projeto
            description: "${description}", 
            estimatedEffort: ${estimatedEffort},
            categoryText: ${categoryText}
            ) {
            id,
            folderTypeName,
            uid,
            communityId
          }`,
        variables: {},
      })
    )
    .end(function (res: { error: string | undefined; raw_body: any }) {
      if (res.error) throw new Error(res.error);
      console.log(res.raw_body);
    });
};
