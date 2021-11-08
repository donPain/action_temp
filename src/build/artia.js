"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.getToken = exports.createActivity = void 0;
var unirest = require("unirest");
const { error } = require("@actions/core");
async function createActivity(organizationId, accountId, folderId, title, description, categoryText, estimatedEffort, creatorEmail, creatorPassword) {
    var newToken = await getToken(creatorEmail, creatorPassword);
    var req = unirest("POST", "https://app.artia.com/graphql")
        .headers({
        OrganizationId: organizationId.toString(),
        "Content-Type": "application/json",
        Authorization: "Bearer " + newToken,
    })
        .send(JSON.stringify({
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
    }))
        .end(function (res) {
        if (res.error)
            throw new Error(res.error);
        console.log(res.raw_body);
    });
}
exports.createActivity = createActivity;
function getToken(creatorEmail, creatorPassword) {
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
}
exports.getToken = getToken;
async function createComment(organizationId, accountId, activityId, creatorEmail, creatorPassword, content) {
    var newToken = await getToken(creatorEmail, creatorPassword);
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
}
exports.createComment = createComment;
