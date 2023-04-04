#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { cdkProjectStack } from '../lib/cdk-project-stack';
import { cdkProjectSimpleResources } from '../lib/cdk-project-stack2'
import { Tags } from 'aws-cdk-lib';
const app = new cdk.App();
const stack = new cdkProjectStack(app, 'CDKDemoStack', {

  env: {
    account: process.env.ACCOUNT_ID,
    region: process.env.REGION
  }
});
const stack2 = new cdkProjectSimpleResources(app, 'CDKDemoStack2', {
  env: {
    account: process.env.ACCOUNT_ID,
    region: process.env.REGION
  }
});
Tags.of(stack).add("Project", "cloudfix-linter-cdk");
Tags.of(stack2).add("Project", "cloudfix-linter-cdk");