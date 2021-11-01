// @ts-nocheck
const core = require('@actions/core');
const github = require('@actions/github');
var postComment = require('./src/build/artiaApi/Comments/postComment.js');
const event = github.context.eventName;
// // Get the JSON webhook payload for the event that triggered the workflow//
const payload            = JSON.stringify(github.context.payload, undefined, 2) 
const objPayload         = JSON.parse(payload)
const organizationId     = core.getInput('organizationId') //OrganizationId informado no main.yml do workflow
const accountId          = core.getInput('accountId') //AccountId informado no main.yml do workflow

try {



switch (event){
  
  case 'push':
    const pushActivityId     = objPayload.commits[0].message.split('[').pop().split(']')[0]; 
    var pushContent          = objPayload.commits[0].message.replace('[]'," ").replace(pushActivityId.toString," ");
    pushContent              += " | link da alteração no git: " + objPayload.compare
    var newComment           = postComment(organizationId, accountId, pushActivityId, pushContent);
  break;

  case 'pull_request':
    const pullRequest    = objPayload.pull_request;  
    const prActivityId   = pullRequest.title.split('[').pop().split(']')[0]; // returns ActivityId
    var prContent        = pullRequest.body.toString();
    var newComment       = postComment(organizationId, accountId, prActivityId, prContent);
  break;
    
  }

} catch (error) {
  core.setFailed(error.message);
}






