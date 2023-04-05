import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';

export class CdkProjectSimpleResources extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const s3FirstBucketName = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const FristBucket = new s3.Bucket(this, "cloudfix-cdk-demo" + "-stack2-s3Bucket-1" + s3FirstBucketName)
    }
}
