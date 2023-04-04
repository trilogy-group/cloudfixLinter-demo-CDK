#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { cdkProjectStack } from '../lib/cdk-project-stack';
import {cdk_project_stack2} from '../lib/cdk-project-stack2'
import { Tags } from 'aws-cdk-lib';

const app = new cdk.App();
const stack = new cdkProjectStack(app, 'CfDemoStack', {
  env:{
    account:'',
    region:''
  }
});
const stack2 = new cdk_project_stack2(app, 'CDKDemoStack2', {
  env:{
    account:'',
    region:''
  }
});
Tags.of(stack).add("Owner", "ankush.pandey@trilogy.com");
Tags.of(stack).add("Project","cloudfix-linter-cdk");
Tags.of(stack2).add("Owner", "ankush.pandey@trilogy.com");
Tags.of(stack2).add("Project","cloudfix-linter-cdk");