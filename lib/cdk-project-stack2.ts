import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class cdk_project_stack2 extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const s3FirstBucketName = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const s3SecondBucketName = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const FristBucket = new s3.Bucket(this, "Bucket_1"+"cloudfix-linter-CDKdemo"+s3FirstBucketName)
        new s3.Bucket(this, "Bucket_2"+"cloudfix-linter-CDKdemo"+s3SecondBucketName)
    }
}
