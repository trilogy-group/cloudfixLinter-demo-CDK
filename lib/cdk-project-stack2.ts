import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { BRANCH_NAME } from './constants';

export class CdkProjectSimpleResources extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const FristBucket = new s3.Bucket(this, "cloudfix-cdk-demo" + "-stack2-s3Bucket-1" + BRANCH_NAME)
    }
}
