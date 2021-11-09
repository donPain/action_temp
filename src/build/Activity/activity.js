"use strict";
// @ts-nocheck
const axios = require("axios");
const asyncGetToken = require("../Authorization/getToken");
module.exports = {
    temp() {
        console.log("integração brasileira");
    },
    async findByTitle(organizationId, accountid, folderId, title) {
        const newToken = await artia.getToken(creatorEmail, creatorPassword);
        var data = JSON.stringify({
            query: `query{
            listingActivities(
                accountId: ${accountId},  # OBRIGATÓRIO - ID do grupo de trabalho
                folderId: ${folderId}# OBRIGATÓRIO - ID da pasta ou do projeto
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
                title
            }
        }`,
            variables: {},
        });
        var config = {
            method: "post",
            url: "https://app.artia.com/graphql",
            headers: {
                OrganizationId: organizationId.toString(),
                "Content-Type": "application/json",
                Authorization: "Bearer " + newToken,
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
            const obj = JSON.parse(JSON.stringify(response.data, undefined, 2));
            const activityArr = obj.data.listingActivities;
            const activity = activityArr.filter(function (obj) {
                return obj.title === "mobralzera [4]";
            });
            return activity;
        })
            .catch(function (error) {
            console.log(error);
        });
    },
    async create(organizationId, accountId, folderId, title, description, categoryText, estimatedEffort, creatorEmail, creatorPassword) {
        var newToken = await asyncGetToken(creatorEmail, creatorPassword);
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
              createdForUser,
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
    },
    async comment(organizationId, accountId, activityId, creatorEmail, creatorPassword, content) {
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
    },
};
