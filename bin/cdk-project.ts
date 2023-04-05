#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkDemoStack } from '../lib/cdk-project-stack';
import { CdkDemoStack2 } from '../lib/cdk-project-stack2'
import { Tags } from 'aws-cdk-lib';

const app = new cdk.App();
const stack = new CdkDemoStack(app, 'CfDemoStack', {
  env: {
    account: '269164092502',
    region: 'us-east-1'
  }
});
const stack2 = new CdkDemoStack2(app, 'CDKDemoStack2', {
  env: {
    account: '269164092502',
    region: 'us-east-1'
  }
});
Tags.of(stack).add("Owner", "ankush.pandey@trilogy.com");
Tags.of(stack).add("Project", "cloudfix-linter-cdk");
Tags.of(stack2).add("Owner", "ankush.pandey@trilogy.com");
Tags.of(stack2).add("Project", "cloudfix-linter-cdk");