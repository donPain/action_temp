var unirest = require("unirest");
const { error } = require("@actions/core");

export async function createActivity(
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
  var newToken = await getToken(creatorEmail, creatorPassword);
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
            communityId,
            customStatus {
                id, 
                statusName,
                status
            },
            status,
            title,
            description,
            groupCategories,
            priority,
            estimatedStart,
            timeEstimatedStart,
            estimatedEnd,
            timeEstimatedEnd,
            durationEstimatedCalculated,
            actualStart,
            timeActualStart,
            actualEnd,
            timeActualEnd,
            durationCalculated
            estimatedEffort,
            actualEffort,
            remainingEffort,
            completedPercent,
            lastCalculation,
            workDaysEstimated,
            remainingDays,
            daysToCalculation,
            replanned,
            replannedCount,
            position,
            financePredicted, 
            financeAccomplished,
            isCriticalPath,
            customColumns, 
            tendencyEnd,
            tfsKey, 
            verifyConflicts,
            typeColor, 
            schedulePerformanceIndex,
            distributeAllocationAutomatically,
            createdAt,
            updatedAt,
            deletedAt,
            createdById,
            createdForUser,escription = "descrição de atividade";

            responsible {
                id,
                name,
                email
            },
            customField {
                hashField,
                value
            },
            parent {
                id,
                name,
                accountId,
            },
            comments {
                id,
                content,
                author{
                    id,
                    name,
                    email
                },
                createdAt    
            }
        }
    }`,
        variables: {},
      })
    )
    .end(function (res: { error: string | undefined; raw_body: any }) {
      if (res.error) throw new Error(res.error);
      console.log(res.raw_body);
    });
}

export function getToken(creatorEmail: string, creatorPassword: string) {
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
        return resolve(token);
      })
  );
}

export async function createComment(
  organizationId: number,
  accountId: number,
  activityId: number,
  creatorEmail: string,
  creatorPassword: string,
  content: string
) {
  var newToken = await getToken(creatorEmail, creatorPassword);
  var req = unirest("POST", "https://app.artia.com/graphql")
    .headers({
      OrganizationId: organizationId.toString(),
      "Content-Type": "application/json",
      Authorization: "Bearer " + newToken,
    })
    .send(
      JSON.stringify({
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
      })
    )
    .end(function (res: { error: string | undefined; raw_body: any }) {
      if (res.error) throw new Error(res.error);
      console.log(res.raw_body);
    });
}
