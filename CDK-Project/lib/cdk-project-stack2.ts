import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class cdk_project_stack2 extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const FristBucket = new s3.Bucket(this, "Bucket_1")
        new s3.Bucket(this, "Bucket_2")
    }
}
