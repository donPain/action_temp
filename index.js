// @ts-nocheck
const core = require('@actions/core');
const github = require('@actions/github');
var postComment = require('./src/build/artiaApi/Comments/postComment.js');



try {

// // Get the JSON webhook payload for the event that triggered the workflow//
// const payload     = JSON.stringify(github.context.payload, undefined, 2) 
// const objPayload  = JSON.parse(payload)
// const pullRequest = objPayload.pull_request;
// //-------------------------------------------------------------------------//
// const organizationId = core.getInput('organizationId') //OrganizationId informado no main.yml do workflow
// const accountId      = core.getInput('accountId') //AccountId informado no main.yml do workflow
// const activityId     = pullRequest.title.split('[').pop().split(']')[0]; // returns ActivityId
// const content        = pullRequest.body.toString();

console.log(github.context.eventName);

// var newComment = postComment(organizationId, accountId, activityId, content);

} catch (error) {
  core.setFailed(error.message);
}






