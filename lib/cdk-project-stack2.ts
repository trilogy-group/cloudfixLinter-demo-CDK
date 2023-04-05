import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkDemoStack2 extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const s3FirstBucketName = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const s3SecondBucketName = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const FristBucket = new s3.Bucket(this, "cloudfix-cdk-demo" + "-stack2-s3Bucket-1" + s3FirstBucketName)
        new s3.Bucket(this, "cloudfix-cdk-demo" + "-stack2-s3Bucket-1" + s3SecondBucketName)
    }
}
