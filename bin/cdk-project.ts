#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { cdkProjectStack } from '../lib/cdk-project-stack';
import {cdk_project_stack2} from '../lib/cdk-project-stack2'
import { Tags } from 'aws-cdk-lib';
import {ACCOUNT_ID,REGION} from '../lib/constants'
const app = new cdk.App();
const stack = new cdkProjectStack(app, 'CfDemoStack', {
  env:{
    account:ACCOUNT_ID,
    region:REGION
  }
});
const stack2 = new cdk_project_stack2(app, 'CDKDemoStack2', {
  env:{
    account:ACCOUNT_ID,
    region:REGION
  }
});
Tags.of(stack).add("Owner", "ankush.pandey@trilogy.com");
Tags.of(stack).add("Project","cloudfix-linter-cdk");
Tags.of(stack2).add("Owner", "ankush.pandey@trilogy.com");
Tags.of(stack2).add("Project","cloudfix-linter-cdk");