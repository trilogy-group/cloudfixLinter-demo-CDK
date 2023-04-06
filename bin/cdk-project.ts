#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkProjectStack } from '../lib/cdk-project-stack';
import { CdkProjectSimpleResources } from '../lib/cdk-project-stack2'
import { Tags } from 'aws-cdk-lib';
import { BRANCH_NAME } from '../lib/constants';

const app = new cdk.App();
function envVarsPresent() {
  const accountId = process.env.ACCOUNT_ID
  const region = process.env.REGION
  if ((!region && !accountId) || process.env.ACCOUNT_ID === '' || process.env.REGION === '') {
    return false
  }
  return true
}

if (!envVarsPresent()) {
  console.log("ENV VARS ARE NOT SET. Please export ACCOUNT_ID and REGION to deploy stacks")

} else {

  const stack = new CdkProjectStack(app, 'CdkStack' + BRANCH_NAME, {

    env: {
      account: process.env.ACCOUNT_ID,
      region: process.env.REGION
    }
  });
  const stack2 = new CdkProjectSimpleResources(app, 'CdkSimpleResourcesStack' + BRANCH_NAME, {
    env: {
      account: process.env.ACCOUNT_ID,
      region: process.env.REGION
    }
  });
  Tags.of(stack).add("Project", "cloudfix-linter-cdk");
  Tags.of(stack2).add("Project", "cloudfix-linter-cdk");
}