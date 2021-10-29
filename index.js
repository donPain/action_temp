// @ts-nocheck
const core = require('@actions/core');
const github = require('@actions/github');
// var payload = '{"action":"opened","issue":{"active_lock_reason":null,"assignee":null,"assignees":[],"author_association":"OWNER","body":"TESTE de issue\r\n; Ola","closed_at":null,"comments":0,"comments_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/issues/4/comments","created_at":"2021-10-23T12:12:19Z","events_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/issues/4/events","html_url":"https://github.com/donPain/hello-world-javascript-action/issues/4","id":1034153361,"labels":[],"labels_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/issues/4/labels{/name}","locked":false,"milestone":null,"node_id":"I_kwDOGQZ8Fs49o-2R","number":4,"performed_via_github_app":null,"reactions":{"+1":0,"-1":0,"confused":0,"eyes":0,"heart":0,"hooray":0,"laugh":0,"rocket":0,"total_count":0,"url":"https://api.github.com/repos/donPain/hello-world-javascript-action/issues/4/reactions"},"repository_url":"https://api.github.com/repos/donPain/hello-world-javascript-action","state":"open","timeline_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/issues/4/timeline","title":"TESte2322","updated_at":"2021-10-23T12:12:19Z","url":"https://api.github.com/repos/donPain/hello-world-javascript-action/issues/4","user":{"avatar_url":"https://avatars.githubusercontent.com/u/62780687?v=4","events_url":"https://api.github.com/users/donPain/events{/privacy}","followers_url":"https://api.github.com/users/donPain/followers","following_url":"https://api.github.com/users/donPain/following{/other_user}","gists_url":"https://api.github.com/users/donPain/gists{/gist_id}","gravatar_id":"","html_url":"https://github.com/donPain","id":62780687,"login":"donPain","node_id":"MDQ6VXNlcjYyNzgwNjg3","organizations_url":"https://api.github.com/users/donPain/orgs","received_events_url":"https://api.github.com/users/donPain/received_events","repos_url":"https://api.github.com/users/donPain/repos","site_admin":false,"starred_url":"https://api.github.com/users/donPain/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/donPain/subscriptions","type":"User","url":"https://api.github.com/users/donPain"}},"repository":{"allow_forking":true,"archive_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/{archive_format}{/ref}","archived":false,"assignees_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/assignees{/user}","blobs_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/git/blobs{/sha}","branches_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/branches{/branch}","clone_url":"https://github.com/donPain/hello-world-javascript-action.git","collaborators_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/collaborators{/collaborator}","comments_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/comments{/number}","commits_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/commits{/sha}","compare_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/compare/{base}...{head}","contents_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/contents/{+path}","contributors_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/contributors","created_at":"2021-10-21T19:40:01Z","default_branch":"master","deployments_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/deployments","description":"Repository for JS Action","disabled":false,"downloads_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/downloads","events_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/events","fork":false,"forks":0,"forks_count":0,"forks_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/forks","full_name":"donPain/hello-world-javascript-action","git_commits_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/git/commits{/sha}","git_refs_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/git/refs{/sha}","git_tags_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/git/tags{/sha}","git_url":"git://github.com/donPain/hello-world-javascript-action.git","has_downloads":true,"has_issues":true,"has_pages":false,"has_projects":true,"has_wiki":true,"homepage":null,"hooks_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/hooks","html_url":"https://github.com/donPain/hello-world-javascript-action","id":419855382,"is_template":false,"issue_comment_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/issues/comments{/number}","issue_events_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/issues/events{/number}","issues_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/issues{/number}","keys_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/keys{/key_id}","labels_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/labels{/name}","language":"JavaScript","languages_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/languages","license":null,"merges_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/merges","milestones_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/milestones{/number}","mirror_url":null,"name":"hello-world-javascript-action","node_id":"R_kgDOGQZ8Fg","notifications_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/notifications{?since,all,participating}","open_issues":4,"open_issues_count":4,"owner":{"avatar_url":"https://avatars.githubusercontent.com/u/62780687?v=4","events_url":"https://api.github.com/users/donPain/events{/privacy}","followers_url":"https://api.github.com/users/donPain/followers","following_url":"https://api.github.com/users/donPain/following{/other_user}","gists_url":"https://api.github.com/users/donPain/gists{/gist_id}","gravatar_id":"","html_url":"https://github.com/donPain","id":62780687,"login":"donPain","node_id":"MDQ6VXNlcjYyNzgwNjg3","organizations_url":"https://api.github.com/users/donPain/orgs","received_events_url":"https://api.github.com/users/donPain/received_events","repos_url":"https://api.github.com/users/donPain/repos","site_admin":false,"starred_url":"https://api.github.com/users/donPain/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/donPain/subscriptions","type":"User","url":"https://api.github.com/users/donPain"},"private":false,"pulls_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/pulls{/number}","pushed_at":"2021-10-23T12:11:47Z","releases_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/releases{/id}","size":5163,"ssh_url":"git@github.com:donPain/hello-world-javascript-action.git","stargazers_count":0,"stargazers_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/stargazers","statuses_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/statuses/{sha}","subscribers_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/subscribers","subscription_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/subscription","svn_url":"https://github.com/donPain/hello-world-javascript-action","tags_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/tags","teams_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/teams","topics":[],"trees_url":"https://api.github.com/repos/donPain/hello-world-javascript-action/git/trees{/sha}","updated_at":"2021-10-23T12:11:50Z","url":"https://api.github.com/repos/donPain/hello-world-javascript-action","visibility":"public","watchers":0,"watchers_count":0},"sender":{"avatar_url":"https://avatars.githubusercontent.com/u/62780687?v=4","events_url":"https://api.github.com/users/donPain/events{/privacy}","followers_url":"https://api.github.com/users/donPain/followers","following_url":"https://api.github.com/users/donPain/following{/other_user}","gists_url":"https://api.github.com/users/donPain/gists{/gist_id}","gravatar_id":"","html_url":"https://github.com/donPain","id":62780687,"login":"donPain","node_id":"MDQ6VXNlcjYyNzgwNjg3","organizations_url":"https://api.github.com/users/donPain/orgs","received_events_url":"https://api.github.com/users/donPain/received_events","repos_url":"https://api.github.com/users/donPain/repos","site_admin":false,"starred_url":"https://api.github.com/users/donPain/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/donPain/subscriptions","type":"User","url":"https://api.github.com/users/donPain"}}'
// payload = payload.replace('\r\n','')

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)

  

//   const objPayload = JSON.parse(payload)
  console.log(payload)


  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}