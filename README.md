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
