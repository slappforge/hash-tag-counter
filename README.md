# Hash Tag Counter

This application is supposed to count hash tag usage of social media posts. This uses AWS Kinesis which works as the input source and AWS DynamoDB which uses to persist the processed information of the hash tag usage. 

## Prerequisites

All the deployments of this application are based on Amazon AWS. To open the project, you will need the Sigma IDE which can be found at https://slappforge.adroitlogic.com. You will need to create an account and provide your AWS credentials to open the project (Your AWS credentials will not be acquired by SLAppForge under any circumstances).

## Usecase Description

This application is supposed to get social media posts via a Kinesis Stream (with name hash-tag-stream) as a JSON message which has a format like below,

```json
{
    "Application": "Facebook",
    "Message": "Tomorrows election will decide the development of our country for next couple of years",
    "HashTags": ["Election", "2018"]
}
```
This application will fetch above message from Kinesis and process it to indetify the used hash tags and compare those hash tags with the already existing entries in the DynomoDB table with name HashTags which keeps hash tag usage for each social media application. Comparing the already existing entries it will update the usage count of each hash tag based on the input message content.

To test this sample, another Lambda function is bundled, which exposes an API Gateway endpoint to put records to the Kinesis Stream which is considered as the input source for the lambda function.

## Getting Started

In order to get started you just have to open the sample project from the SLappForge IDE and deploy it on top of your AWS account. If you want to deploy the sample project as it's without any changes, you can directly deploy your project. However, if there are any changes for the project, IDE will get a clone of the project and commit it to your own GitHub account to allow you to keep playing with the source code to get familiar with the application.

## Deployment

Click on the deployment button and it should deploy all lambdas that are required to run the application.

## Testing

After the deployment, you can test this sample application by sending an HTTP request to the created API Gateway (activity-stream-proxy). To find the endpoint URL, please follow these steps.

1. Sign in to the AWS Management Console, and then open the API Gateway console at [https://console.aws.amazon.com/apigateway/](https://console.aws.amazon.com/apigateway/ "Amazon API Gateway").
2. Make sure that you are signed in to the AWS region where you selected when creating the Sigma project.
3. On the API Gateway page, in the APIs list, select "populate-hash-tag-data-proxy" API.
4. In the Stages navigation pane, expand the Prod stage, select POST on /report, and then copy the Invoke URL value in the format of https://{api-id}.execute-api.{region}.amazonaws.com/Prod/populate.
5. Now, send an HTTP POST request to the endpoint you found in the earlier step with a sample JSON payload as follows - Data populating Lambda will extract out the HashTagData message array and push them one by one to the Kinesis Stream.
```json
{
  "HashTagData": [
    {
      "Application": "Facebook",
      "Message": "Tomorrow's election will decide the development of our country for next couple of years",
      "HashTags": ["Election", "2018"]
    },
    {
      "Application": "Facebook",
      "Message": "Education related message",
      "HashTags": ["Education"]
    },{
      "Application": "Twitter",
      "Message": "Cricket related message",
      "HashTags": ["Cricket", "2018", "ICC"]
    },{
      "Application": "LinkedIn",
      "Message": "Serverless related message",
      "HashTags": ["Serverless", "AWS"]
    }
  ]
}
```
6. If you were successful in putting a record to the Kinesis Stream, you'll get a response payload as follows.
```json
{
  "Code": "Success",
  "Message": "Hash tag records are successfully populated to hash-tag-stream",
  "Data": {
    "ShardId": "shardId-000000000000",
    "SequenceNumber": "49581435652594209436834844713832860988000069482648174594"
  }
}
```
7. Then, to check if the processing was executed successfully, in the AWS Management Console, open the DynamoDB console at [https://console.aws.amazon.com/dynamodb/](https://console.aws.amazon.com/dynamodb/ "DynamoDB").
8. In the Tables navigation pane under DynamoDB, select "HashTags" table and go to items tab.
9. You should see your table is updated with the hash tag values you have included in your test messages set.

## Authors

* **Manjula Piyumal**

## License

```
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in 
compliance with the License. You may obtain a copy of the License at 

http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and limitations under the License. 
```

## Acknowledgments

* Awesome SLAppForge team