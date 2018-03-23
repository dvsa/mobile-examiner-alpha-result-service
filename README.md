# mobile-examiner-alpha-result-service
DVSA Mobile Examiner Services (GDS Alpha phase) - Result Microservice

AWS Lambda written in TypeScript to add test result into database (DynamoDB)

### Useful commands

`npm run start` - runs build and run in watch mode sls offline - useful for development
`npm run test` - runs JEST unit tests
`npm run create-package` - builds app > runs unit tests > creates *deployment-package.zip* that can be uploaded to AWS

### Swagger
+Go to [editor.swagger.io](http://editor.swagger.io/) and paste in the contents of `./swagger/test-result.yml

# Distribution builds
Refer to the scripts inside dist-scripts for each of the distribution build steps

# Security

## Git Hooks
For each public github repo you are working on, please set up the following prepush git hook in .git/hooks/pre-push

```
  #!/bin/sh
  git secrets --scan && git log -p -n 15 | scanrepo 
```

Make sure the hook is executable (chmod +x .git/hooks/pre-push)


If you tend to commit more than you push, up the 15 to a more suitable number to cover all of your commits - you should be pushing more often though.

## Security Tools

Can you install and run the following security programs as part of your testing process:

https://github.com/awslabs/git-secrets

After installing, do a one-time set up (in each repo) with 

```
  cd /path/to/my/repo
  git secrets --install
  git secrets --register-aws
```

Run with git secrets --scan.

https://github.com/UKHomeOffice/repo-security-scanner

After installing, run with git log -p | scanrepo.
