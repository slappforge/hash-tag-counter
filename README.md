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

## Getting Started

In order to get started you just have to open the sample project from the SLappForce IDE and deploy it on top of your AWS account. While deploying the project, IDE will get a clone of this and commit it to your own GitHub account to allow you to keep playing with the source code to get familiar with the application.

## Deployment

Click on the deployment button and it should deploy all lambdas that are required to run the application.

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