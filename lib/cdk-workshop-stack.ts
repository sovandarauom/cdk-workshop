import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import { FunctionProps } from '@aws-cdk/aws-lambda';
import * as gateway from '@aws-cdk/aws-apigateway'
import { LambdaRestApiProps } from '@aws-cdk/aws-apigateway';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // defines an AWS Lambda resource
    const properties: FunctionProps = {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'
    }
    const hello = new lambda.Function(this, 'HelloHandler', properties);

    // defines an API Gateway REST API resource backed by our "hello" function.
    const lambdaRestApiProps: LambdaRestApiProps = {handler : hello}
    new gateway.LambdaRestApi(this, 'Endpoint', lambdaRestApiProps)
  }
}
``